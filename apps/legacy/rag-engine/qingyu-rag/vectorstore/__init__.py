"""
VectorStore：儲存 chunk 向量並支援 cosine similarity 搜尋。

用 SQLite 存明細（含 tenant_id 做多租戶隔離），向量以 JSON 存放；
查詢時把該租戶的向量全部載入記憶體用 numpy 算 cosine similarity。
文件量在數萬筆以內這個做法效能足夠；量再往上建議換成
FAISS / pgvector / Milvus 等專用向量資料庫（介面設計成可替換）。
"""
from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from dataclasses import dataclass
from pathlib import Path
from typing import Iterator, Optional

import numpy as np

_SCHEMA = """
CREATE TABLE IF NOT EXISTS vectors (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    doc_id TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    text TEXT NOT NULL,
    vector TEXT NOT NULL,
    metadata TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_vectors_tenant ON vectors(tenant_id);
CREATE INDEX IF NOT EXISTS idx_vectors_doc ON vectors(doc_id);
"""


@dataclass
class SearchResult:
    id: str
    doc_id: str
    chunk_index: int
    text: str
    score: float
    metadata: dict


class VectorStore:
    def __init__(self, db_path: str = "data/vectors.db"):
        self.db_path = db_path
        Path(db_path).parent.mkdir(parents=True, exist_ok=True)
        with self._connect() as conn:
            conn.executescript(_SCHEMA)

    @contextmanager
    def _connect(self) -> Iterator[sqlite3.Connection]:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
            conn.commit()
        finally:
            conn.close()

    def add(
        self,
        tenant_id: str,
        doc_id: str,
        chunk_id: str,
        chunk_index: int,
        text: str,
        vector: list[float],
        metadata: Optional[dict] = None,
    ) -> None:
        with self._connect() as conn:
            conn.execute(
                """
                INSERT OR REPLACE INTO vectors
                (id, tenant_id, doc_id, chunk_index, text, vector, metadata)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    chunk_id,
                    tenant_id,
                    doc_id,
                    chunk_index,
                    text,
                    json.dumps(vector),
                    json.dumps(metadata or {}, ensure_ascii=False),
                ),
            )

    def add_batch(
        self,
        tenant_id: str,
        doc_id: str,
        items: list[tuple[str, int, str, list[float], dict]],
    ) -> None:
        """items: list of (chunk_id, chunk_index, text, vector, metadata)"""
        with self._connect() as conn:
            conn.executemany(
                """
                INSERT OR REPLACE INTO vectors
                (id, tenant_id, doc_id, chunk_index, text, vector, metadata)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                [
                    (
                        chunk_id,
                        tenant_id,
                        doc_id,
                        chunk_index,
                        text,
                        json.dumps(vector),
                        json.dumps(meta or {}, ensure_ascii=False),
                    )
                    for chunk_id, chunk_index, text, vector, meta in items
                ],
            )

    def delete_document(self, tenant_id: str, doc_id: str) -> None:
        with self._connect() as conn:
            conn.execute(
                "DELETE FROM vectors WHERE tenant_id = ? AND doc_id = ?",
                (tenant_id, doc_id),
            )

    def search(
        self,
        tenant_id: str,
        query_vector: list[float],
        top_k: int = 5,
    ) -> list[SearchResult]:
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT * FROM vectors WHERE tenant_id = ?", (tenant_id,)
            ).fetchall()

        if not rows:
            return []

        q = np.array(query_vector, dtype=np.float32)
        q_norm = np.linalg.norm(q) or 1.0

        scored: list[SearchResult] = []
        for row in rows:
            v = np.array(json.loads(row["vector"]), dtype=np.float32)
            v_norm = np.linalg.norm(v) or 1.0
            score = float(np.dot(q, v) / (q_norm * v_norm))
            scored.append(
                SearchResult(
                    id=row["id"],
                    doc_id=row["doc_id"],
                    chunk_index=row["chunk_index"],
                    text=row["text"],
                    score=score,
                    metadata=json.loads(row["metadata"]),
                )
            )

        scored.sort(key=lambda r: r.score, reverse=True)
        return scored[:top_k]
