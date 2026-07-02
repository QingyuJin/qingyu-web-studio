"""
Document version registry.

The vector store keeps the active searchable chunks. This registry keeps the
document/version metadata and source text needed for version history and restore.
"""
from __future__ import annotations

import hashlib
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterator, Optional
from uuid import uuid4

_SCHEMA = """
CREATE TABLE IF NOT EXISTS documents (
    tenant_id TEXT NOT NULL,
    doc_id TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    source_filename TEXT NOT NULL DEFAULT '',
    active_version INTEGER NOT NULL DEFAULT 0,
    deleted INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (tenant_id, doc_id)
);

CREATE TABLE IF NOT EXISTS document_versions (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    doc_id TEXT NOT NULL,
    version INTEGER NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    source_filename TEXT NOT NULL DEFAULT '',
    content_hash TEXT NOT NULL,
    char_count INTEGER NOT NULL DEFAULT 0,
    chunk_count INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    request_id TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    content_text TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    UNIQUE (tenant_id, doc_id, version)
);

CREATE INDEX IF NOT EXISTS idx_documents_tenant ON documents(tenant_id);
CREATE INDEX IF NOT EXISTS idx_document_versions_doc ON document_versions(tenant_id, doc_id);
"""


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _hash_content(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


class DocumentVersionStore:
    def __init__(self, db_path: str = "data/documents.db"):
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

    def next_version(self, *, tenant_id: str, doc_id: str) -> int:
        with self._connect() as conn:
            row = conn.execute(
                """
                SELECT MAX(version) AS latest_version
                FROM document_versions
                WHERE tenant_id = ? AND doc_id = ?
                """,
                (tenant_id, doc_id),
            ).fetchone()
        return int(row["latest_version"] or 0) + 1

    def record_version(
        self,
        *,
        tenant_id: str,
        doc_id: str,
        version: int,
        source_filename: str,
        content_text: str,
        chunk_count: int,
        request_id: str,
        title: Optional[str] = None,
        notes: str = "",
    ) -> dict:
        now = _now()
        title = title or source_filename or doc_id
        content_hash = _hash_content(content_text)
        version_id = uuid4().hex

        with self._connect() as conn:
            conn.execute(
                """
                INSERT OR IGNORE INTO documents
                (tenant_id, doc_id, title, source_filename, active_version, deleted, created_at, updated_at)
                VALUES (?, ?, ?, ?, 0, 0, ?, ?)
                """,
                (tenant_id, doc_id, title, source_filename, now, now),
            )
            conn.execute(
                """
                UPDATE document_versions
                SET status = 'archived'
                WHERE tenant_id = ? AND doc_id = ?
                """,
                (tenant_id, doc_id),
            )
            conn.execute(
                """
                INSERT INTO document_versions
                (id, tenant_id, doc_id, version, title, source_filename, content_hash,
                 char_count, chunk_count, status, request_id, notes, content_text, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, ?, ?)
                """,
                (
                    version_id,
                    tenant_id,
                    doc_id,
                    version,
                    title,
                    source_filename,
                    content_hash,
                    len(content_text),
                    chunk_count,
                    request_id,
                    notes,
                    content_text,
                    now,
                ),
            )
            conn.execute(
                """
                UPDATE documents
                SET title = ?, source_filename = ?, active_version = ?, deleted = 0, updated_at = ?
                WHERE tenant_id = ? AND doc_id = ?
                """,
                (title, source_filename, version, now, tenant_id, doc_id),
            )

        return {
            "id": version_id,
            "doc_id": doc_id,
            "version": version,
            "title": title,
            "source_filename": source_filename,
            "content_hash": content_hash,
            "char_count": len(content_text),
            "chunk_count": chunk_count,
            "status": "active",
            "created_at": now,
        }

    def list_documents(self, *, tenant_id: str, include_deleted: bool = False) -> list[dict]:
        clause = "" if include_deleted else "AND d.deleted = 0"
        with self._connect() as conn:
            rows = conn.execute(
                f"""
                SELECT
                    d.tenant_id,
                    d.doc_id,
                    d.title,
                    d.source_filename,
                    d.active_version,
                    d.deleted,
                    d.created_at,
                    d.updated_at,
                    v.chunk_count,
                    v.char_count,
                    v.content_hash
                FROM documents d
                LEFT JOIN document_versions v
                    ON v.tenant_id = d.tenant_id
                   AND v.doc_id = d.doc_id
                   AND v.version = d.active_version
                WHERE d.tenant_id = ? {clause}
                ORDER BY d.updated_at DESC
                """,
                (tenant_id,),
            ).fetchall()
        return [dict(row) for row in rows]

    def list_versions(self, *, tenant_id: str, doc_id: str) -> list[dict]:
        with self._connect() as conn:
            rows = conn.execute(
                """
                SELECT
                    id,
                    tenant_id,
                    doc_id,
                    version,
                    title,
                    source_filename,
                    content_hash,
                    char_count,
                    chunk_count,
                    status,
                    request_id,
                    notes,
                    created_at
                FROM document_versions
                WHERE tenant_id = ? AND doc_id = ?
                ORDER BY version DESC
                """,
                (tenant_id, doc_id),
            ).fetchall()
        return [dict(row) for row in rows]

    def get_version(self, *, tenant_id: str, doc_id: str, version: int) -> Optional[dict]:
        with self._connect() as conn:
            row = conn.execute(
                """
                SELECT *
                FROM document_versions
                WHERE tenant_id = ? AND doc_id = ? AND version = ?
                """,
                (tenant_id, doc_id, version),
            ).fetchone()
        return dict(row) if row else None

    def mark_deleted(self, *, tenant_id: str, doc_id: str) -> None:
        now = _now()
        with self._connect() as conn:
            conn.execute(
                """
                UPDATE documents
                SET deleted = 1, updated_at = ?
                WHERE tenant_id = ? AND doc_id = ?
                """,
                (now, tenant_id, doc_id),
            )
            conn.execute(
                """
                UPDATE document_versions
                SET status = CASE WHEN status = 'active' THEN 'deleted' ELSE status END
                WHERE tenant_id = ? AND doc_id = ?
                """,
                (tenant_id, doc_id),
            )
