"""
儲存層：使用 SQLite 儲存 metric log。

之後若要換成 Postgres/MySQL，只需要替換這個檔案內的實作，
上層的 MetricsTracker / API 都不需要改動（介面保持一致）。
"""
from __future__ import annotations

import json
import sqlite3
import threading
from contextlib import contextmanager
from datetime import datetime
from pathlib import Path
from typing import Iterator, Optional

from .models import MetricLog, Stage

_SCHEMA = """
CREATE TABLE IF NOT EXISTS metric_logs (
    id TEXT PRIMARY KEY,
    request_id TEXT NOT NULL,
    stage TEXT NOT NULL,
    model TEXT,
    input_tokens INTEGER NOT NULL DEFAULT 0,
    output_tokens INTEGER NOT NULL DEFAULT 0,
    latency_ms REAL NOT NULL DEFAULT 0,
    success INTEGER NOT NULL DEFAULT 1,
    error_message TEXT,
    cost_usd REAL,
    metadata TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_metric_logs_stage ON metric_logs(stage);
CREATE INDEX IF NOT EXISTS idx_metric_logs_created_at ON metric_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_metric_logs_request_id ON metric_logs(request_id);
"""


class MetricsStorage:
    """執行緒安全的 SQLite 儲存層"""

    def __init__(self, db_path: str = "metrics.db"):
        self.db_path = db_path
        Path(db_path).parent.mkdir(parents=True, exist_ok=True)
        self._local = threading.local()
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

    def save(self, log: MetricLog) -> None:
        with self._connect() as conn:
            conn.execute(
                """
                INSERT INTO metric_logs
                (id, request_id, stage, model, input_tokens, output_tokens,
                 latency_ms, success, error_message, cost_usd, metadata, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    log.id,
                    log.request_id,
                    log.stage,
                    log.model,
                    log.input_tokens,
                    log.output_tokens,
                    log.latency_ms,
                    int(log.success),
                    log.error_message,
                    log.cost_usd,
                    json.dumps(log.metadata, ensure_ascii=False),
                    log.created_at.isoformat(),
                ),
            )

    def query_logs(
        self,
        stage: Optional[Stage] = None,
        request_id: Optional[str] = None,
        start: Optional[datetime] = None,
        end: Optional[datetime] = None,
        limit: int = 100,
        offset: int = 0,
    ) -> list[dict]:
        clauses, params = [], []
        if stage:
            clauses.append("stage = ?")
            params.append(stage if isinstance(stage, str) else stage.value)
        if request_id:
            clauses.append("request_id = ?")
            params.append(request_id)
        if start:
            clauses.append("created_at >= ?")
            params.append(start.isoformat())
        if end:
            clauses.append("created_at <= ?")
            params.append(end.isoformat())

        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
        sql = f"""
            SELECT * FROM metric_logs
            {where}
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        """
        params.extend([limit, offset])

        with self._connect() as conn:
            rows = conn.execute(sql, params).fetchall()
            return [dict(r) for r in rows]

    def summary(
        self,
        start: Optional[datetime] = None,
        end: Optional[datetime] = None,
    ) -> list[dict]:
        """依 stage 分組彙總：次數、平均延遲、P95 延遲、token 總量、成本總量、成功率"""
        clauses, params = [], []
        if start:
            clauses.append("created_at >= ?")
            params.append(start.isoformat())
        if end:
            clauses.append("created_at <= ?")
            params.append(end.isoformat())
        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""

        sql = f"""
            SELECT
                stage,
                COUNT(*) AS request_count,
                AVG(latency_ms) AS avg_latency_ms,
                MIN(latency_ms) AS min_latency_ms,
                MAX(latency_ms) AS max_latency_ms,
                SUM(input_tokens) AS total_input_tokens,
                SUM(output_tokens) AS total_output_tokens,
                SUM(COALESCE(cost_usd, 0)) AS total_cost_usd,
                SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) * 1.0 / COUNT(*) AS success_rate
            FROM metric_logs
            {where}
            GROUP BY stage
            ORDER BY stage
        """
        with self._connect() as conn:
            rows = conn.execute(sql, params).fetchall()
            return [dict(r) for r in rows]
