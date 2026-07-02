"""
FastAPI 驗證 dependency：從 request header 取得並驗證身份，注入 tenant_id。

三種身份：
  - require_api_key    給伺服器對伺服器呼叫（例如 qingyuweb.com 後端呼叫上傳/管理 API）
  - require_widget_token 給瀏覽器端 widget 呼叫（短期 JWT，只能問答）
  - require_admin      給系統管理員呼叫（建立/查詢 API Key 本身）
"""
from __future__ import annotations

import os

import jwt as pyjwt
from fastapi import Header, HTTPException, status

from .api_keys import ApiKeyStore
from .jwt_tokens import verify_widget_token

_api_key_store = ApiKeyStore("data/auth.db")


def _extract_bearer(authorization: str | None) -> str | None:
    if not authorization:
        return None
    parts = authorization.split(" ", 1)
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return None
    return parts[1]


async def require_api_key(authorization: str | None = Header(default=None)) -> str:
    """驗證長期 API Key，回傳 tenant_id。用在文件上傳/刪除等管理端點。"""
    raw_key = _extract_bearer(authorization)
    info = _api_key_store.verify(raw_key) if raw_key else None
    if not info:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="無效或缺少 API Key，請在 Authorization: Bearer <key> 帶入",
        )
    return info.tenant_id


async def require_widget_token(authorization: str | None = Header(default=None)) -> str:
    """驗證短期 widget JWT，回傳 tenant_id。用在 /chat 這種前端會直接呼叫的端點。"""
    token = _extract_bearer(authorization)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="缺少 widget token，請在 Authorization: Bearer <token> 帶入",
        )
    try:
        payload = verify_widget_token(token, required_scope="chat")
    except pyjwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="token 已過期，請重新取得")
    except pyjwt.PyJWTError:
        raise HTTPException(status_code=401, detail="無效的 token")
    return payload.tenant_id


async def require_admin(x_admin_secret: str | None = Header(default=None)) -> None:
    """驗證管理權限，用在建立/管理 API Key 的端點（例如 qingyuweb.com 後端的管理介面）。"""
    expected = os.environ.get("ADMIN_SECRET")
    if not expected or x_admin_secret != expected:
        raise HTTPException(status_code=403, detail="需要管理權限")
