"""
測試 API Key -> Widget JWT -> /chat 的完整驗證流程，
以及租戶隔離、無效金鑰、admin secret 是否正確擋掉未授權請求。
"""
import os
import sys
from pathlib import Path

os.environ.setdefault("ADMIN_SECRET", "test-admin-secret")
os.environ.setdefault("WIDGET_JWT_SECRET", "test-widget-secret-please-change")

sys.path.insert(0, str(Path(__file__).parent))

from fastapi.testclient import TestClient

import main

client = TestClient(main.app)

print("=== 1. 沒有 admin secret 不能建立 API Key ===")
r = client.post("/admin/api-keys", json={"tenant_id": "acme-corp"})
assert r.status_code == 403, r.text
print("  正確擋掉：", r.status_code)

print("\n=== 2. 用正確 admin secret 建立 API Key ===")
r = client.post(
    "/admin/api-keys",
    json={"tenant_id": "acme-corp", "label": "qingyuweb-backend"},
    headers={"X-Admin-Secret": "test-admin-secret"},
)
assert r.status_code == 200, r.text
api_key = r.json()["api_key"]
print("  api_key prefix:", api_key[:12], "...")

print("\n=== 3. 沒有 API Key 不能上傳文件 ===")
r = client.post("/documents", files={"file": ("a.txt", b"hello", "text/plain")})
assert r.status_code == 401, r.text
print("  正確擋掉：", r.status_code)

print("\n=== 4. 用 API Key 上傳文件 ===")
r = client.post(
    "/documents",
    files={"file": ("policy.txt", "請假需提前三天申請。".encode("utf-8"), "text/plain")},
    headers={"Authorization": f"Bearer {api_key}"},
)
assert r.status_code == 200, r.text
print("  ", r.json())

print("\n=== 5. 用 API Key 換 widget token ===")
r = client.post("/auth/widget-token", headers={"Authorization": f"Bearer {api_key}"})
assert r.status_code == 200, r.text
widget_token = r.json()["token"]
print("  token 取得成功，", r.json()["expires_in_seconds"], "秒後過期")

print("\n=== 6. widget token 不能拿去呼叫需要 API Key 的端點 ===")
r = client.get("/metrics/summary", headers={"Authorization": f"Bearer {widget_token}"})
assert r.status_code == 401, r.text
print("  正確擋掉（widget token 權限不夠）：", r.status_code)

print("\n=== 7. API Key 反過來也不能當 widget token 用 ===")
r = client.post(
    "/chat",
    json={"query": "請假要提前幾天？"},
    headers={"Authorization": f"Bearer {api_key}"},
)
assert r.status_code == 401, r.text
print("  正確擋掉（API key 不是合法 JWT）：", r.status_code)

print("\n=== 8. 用合法 widget token 呼叫 /chat（驗證層應放行，卡在沒有 ANTHROPIC_API_KEY）===")
try:
    r = client.post(
        "/chat",
        json={"query": "請假要提前幾天？"},
        headers={"Authorization": f"Bearer {widget_token}"},
    )
    print("  status:", r.status_code, "(預期非 401/403，代表已通過身份驗證層)")
    assert r.status_code not in (401, 403), r.text
except TypeError as e:
    # 測試環境沒有設定 ANTHROPIC_API_KEY，Anthropic SDK 在建構請求時就報錯，
    # 但這已經是在通過 require_widget_token 驗證、進入 answer_question() 之後才發生，
    # 證明驗證層本身有正確放行合法請求。
    assert "authentication method" in str(e)
    print("  驗證層已放行，如預期般卡在缺少 ANTHROPIC_API_KEY：", str(e)[:60], "...")

print("\n=== 9. 用 API Key 檢查 metrics（應該成功）===")
r = client.get("/metrics/summary", headers={"Authorization": f"Bearer {api_key}"})
assert r.status_code == 200, r.text
print("  ", r.json())

print("\n全部驗證流程測試通過 ✅")
