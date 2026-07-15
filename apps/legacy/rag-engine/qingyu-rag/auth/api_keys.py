"""
API Key 管理：給「伺服器對伺服器」的呼叫使用（例如 qingyuweb.com 後端呼叫上傳文件 API）。

金鑰本身只在建立當下顯示一次，資料庫只存 hash，外洩資料庫也不會洩漏金鑰明文。
金鑰格式： qyk_<random 32 bytes hex>，方便從字串就能辨識是這個系統的 key。
"""
from __future__ import annotations

import hashlib
import secrets
import sqlite3
from contextlib import contextmanager
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterator, Optional

_SCHEMA = """
CREATE TABLE IF NOT EXISTS api_keys (
    key_hash TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    label TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    revoked INTEGER NOT NULL DEFAULT 0,
    last_used_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_api_keys_tenant ON api_keys(tenant_id);
"""

_PREFIX = "qyk_"


def _hash_key(raw_key: str) -> str:
    return hashlib.sha256(raw_key.encode()).hexdigest()


@dataclass
class ApiKeyInfo:
    tenant_id: str
    label: str


class ApiKeyStore:
    def __init__(self, db_path: str = "data/auth.db"):
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

    def create_key(self, tenant_id: str, label: str = "") -> str:
        """建立新的 API Key，回傳「明文」金鑰（只有這一次看得到，請呼叫端妥善保存）"""
        raw_key = _PREFIX + secrets.token_hex(32)
        with self._connect() as conn:
            conn.execute(
                "INSERT INTO api_keys (key_hash, tenant_id, label) VALUES (?, ?, ?)",
                (_hash_key(raw_key), tenant_id, label),
            )
        return raw_key

    def verify(self, raw_key: str) -> Optional[ApiKeyInfo]:
        if not raw_key or not raw_key.startswith(_PREFIX):
            return None
        with self._connect() as conn:
            row = conn.execute(
                "SELECT tenant_id, label, revoked FROM api_keys WHERE key_hash = ?",
                (_hash_key(raw_key),),
            ).fetchone()
            if not row or row["revoked"]:
                return None
            conn.execute(
                "UPDATE api_keys SET last_used_at = ? WHERE key_hash = ?",
                (datetime.now(timezone.utc).isoformat(), _hash_key(raw_key)),
            )
        return ApiKeyInfo(tenant_id=row["tenant_id"], label=row["label"])

    def revoke(self, raw_key: str) -> None:
        with self._connect() as conn:
            conn.execute(
                "UPDATE api_keys SET revoked = 1 WHERE key_hash = ?",
                (_hash_key(raw_key),),
            )

    def list_keys(self, tenant_id: str) -> list[dict]:
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT key_hash, label, created_at, revoked, last_used_at "
                "FROM api_keys WHERE tenant_id = ?",
                (tenant_id,),
            ).fetchall()
            # 只回傳 hash 前 8 碼當識別用，不洩漏完整 hash
            return [
                {**dict(r), "key_hash": r["key_hash"][:8] + "..."} for r in rows
            ]
