"""
Tenant-scoped rate limiting.

This is a lightweight fixed-window limiter backed by SQLite. It is enough for a
single Vercel/FastAPI worker or small deployment, and the interface can later be
replaced by Redis without changing route dependencies.
"""
from __future__ import annotations

import os
import sqlite3
import threading
import time
from contextlib import contextmanager
from dataclasses import dataclass
from pathlib import Path
from typing import Iterator

_SCHEMA = """
CREATE TABLE IF NOT EXISTS rate_limit_buckets (
    tenant_id TEXT NOT NULL,
    scope TEXT NOT NULL,
    window_start INTEGER NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (tenant_id, scope)
);
"""


@dataclass(frozen=True)
class RateLimitDecision:
    allowed: bool
    limit: int
    remaining: int
    reset_at: int
    retry_after_seconds: int


def _env_int(name: str, fallback: int) -> int:
    raw = os.environ.get(name)
    if raw is None:
        return fallback
    try:
        return int(raw)
    except ValueError:
        return fallback


def api_key_rate_limit_per_minute() -> int:
    return _env_int("RAG_API_KEY_RATE_LIMIT_PER_MINUTE", 120)


def widget_rate_limit_per_minute() -> int:
    return _env_int("RAG_WIDGET_RATE_LIMIT_PER_MINUTE", 60)


def rate_limit_window_seconds() -> int:
    return max(_env_int("RAG_RATE_LIMIT_WINDOW_SECONDS", 60), 1)


class RateLimiter:
    def __init__(self, db_path: str = "data/rate_limits.db", window_seconds: int | None = None):
        self.db_path = db_path
        self.window_seconds = window_seconds or rate_limit_window_seconds()
        self._lock = threading.Lock()
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

    def check(self, *, tenant_id: str, scope: str, limit: int, now: int | None = None) -> RateLimitDecision:
        if limit <= 0:
            current_time = int(now or time.time())
            return RateLimitDecision(
                allowed=True,
                limit=limit,
                remaining=-1,
                reset_at=current_time + self.window_seconds,
                retry_after_seconds=0,
            )

        current_time = int(now or time.time())
        window_start = current_time - (current_time % self.window_seconds)
        reset_at = window_start + self.window_seconds
        retry_after = max(reset_at - current_time, 1)

        with self._lock:
            with self._connect() as conn:
                row = conn.execute(
                    """
                    SELECT window_start, count
                    FROM rate_limit_buckets
                    WHERE tenant_id = ? AND scope = ?
                    """,
                    (tenant_id, scope),
                ).fetchone()

                if not row or row["window_start"] != window_start:
                    conn.execute(
                        """
                        INSERT OR REPLACE INTO rate_limit_buckets
                        (tenant_id, scope, window_start, count)
                        VALUES (?, ?, ?, 1)
                        """,
                        (tenant_id, scope, window_start),
                    )
                    return RateLimitDecision(
                        allowed=True,
                        limit=limit,
                        remaining=limit - 1,
                        reset_at=reset_at,
                        retry_after_seconds=0,
                    )

                current_count = int(row["count"])
                if current_count >= limit:
                    return RateLimitDecision(
                        allowed=False,
                        limit=limit,
                        remaining=0,
                        reset_at=reset_at,
                        retry_after_seconds=retry_after,
                    )

                next_count = current_count + 1
                conn.execute(
                    """
                    UPDATE rate_limit_buckets
                    SET count = ?
                    WHERE tenant_id = ? AND scope = ?
                    """,
                    (next_count, tenant_id, scope),
                )
                return RateLimitDecision(
                    allowed=True,
                    limit=limit,
                    remaining=max(limit - next_count, 0),
                    reset_at=reset_at,
                    retry_after_seconds=0,
                )
