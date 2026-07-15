"""
Widget JWT：給瀏覽器端的嵌入式 widget 使用的短期、範圍受限 token。

流程：
  qingyuweb.com 後端（有長期 API Key）先呼叫 /auth/widget-token 換一個短期 JWT，
  再把這個 JWT 交給瀏覽器上的 widget，widget 用這個 JWT 呼叫 /chat。

這樣瀏覽器裡永遠不會出現長期有效的 API Key，即使 JWT 外洩，
有效期短（預設 15 分鐘）且只能做 chat，風險比長期金鑰低很多。
"""
from __future__ import annotations

import os
import time
from dataclasses import dataclass
from typing import Optional

import jwt

_ALGORITHM = "HS256"
_DEFAULT_TTL_SECONDS = 15 * 60


def _get_secret() -> str:
    secret = os.environ.get("WIDGET_JWT_SECRET")
    if not secret:
        raise RuntimeError(
            "請設定環境變數 WIDGET_JWT_SECRET（建議用 openssl rand -hex 32 產生）"
        )
    return secret


@dataclass
class WidgetTokenPayload:
    tenant_id: str
    scope: list[str]


def create_widget_token(
    tenant_id: str,
    scope: Optional[list[str]] = None,
    ttl_seconds: int = _DEFAULT_TTL_SECONDS,
) -> str:
    scope = scope or ["chat"]
    now = int(time.time())
    payload = {
        "tenant_id": tenant_id,
        "scope": scope,
        "iat": now,
        "exp": now + ttl_seconds,
    }
    return jwt.encode(payload, _get_secret(), algorithm=_ALGORITHM)


def verify_widget_token(token: str, required_scope: str = "chat") -> WidgetTokenPayload:
    """驗證失敗會拋出 jwt.PyJWTError（包含過期、簽章錯誤等），呼叫端要接住"""
    payload = jwt.decode(token, _get_secret(), algorithms=[_ALGORITHM])
    scope = payload.get("scope", [])
    if required_scope not in scope:
        raise jwt.InvalidTokenError(f"token 沒有 {required_scope} 權限")
    return WidgetTokenPayload(tenant_id=payload["tenant_id"], scope=scope)
