"""
Qingyu RAG Engine - FastAPI 主程式

端點：
  POST   /documents             上傳文件並建立索引（需要 API Key）
  GET    /documents             文件列表與 active version（需要 API Key）
  POST   /documents             上傳文件並建立索引（需要 API Key，可帶 doc_id 建新版本）
  GET    /documents/{doc_id}/versions 文件版本列表（需要 API Key）
  POST   /documents/{doc_id}/versions/{version}/restore 還原舊版本為新 active 版本（需要 API Key）
  DELETE /documents/{doc_id}    刪除文件（需要 API Key）
  POST   /auth/widget-token     用 API Key 換一個短期 widget JWT（需要 API Key）
  POST   /chat                  問答，含引用來源（需要 widget JWT）
  POST   /admin/api-keys        建立新租戶的 API Key（需要 Admin Secret）
  GET    /metrics/summary       用量與延遲彙總（需要 API Key）
  GET    /metrics/logs          用量與延遲明細（需要 API Key）

身份驗證分三層，對應三種呼叫者：
  - API Key   ：qingyuweb.com 後端 <-> RAG Engine 之間的伺服器對伺服器呼叫，長期有效
  - Widget JWT：瀏覽器上的 widget 呼叫 /chat 用，短期有效（預設 15 分鐘），只能問答
  - Admin Secret：管理 API Key 本身，只有內部維運會用到

tenant_id 不再由呼叫端自己指定，而是從驗證身份中解析出來，避免客戶端能指定
任意 tenant_id 讀到別的租戶資料。
"""
from __future__ import annotations

import shutil
import tempfile
from pathlib import Path
from uuid import uuid4

from fastapi import Depends, FastAPI, File, Form, HTTPException, UploadFile
from pydantic import BaseModel

from auth import (
    ApiKeyStore,
    create_widget_token,
    require_admin,
    require_api_key,
    require_widget_token,
)
from documents.version_store import DocumentVersionStore
from embedding import LocalHashingEmbedding
from generation import answer_question
from ingestion import ingest_text, read_file
from metrics import MetricsStorage
from metrics.api import router as metrics_router
from retrieval import search
from vectorstore import VectorStore

app = FastAPI(title="Qingyu RAG Engine")
app.include_router(metrics_router, dependencies=[Depends(require_api_key)])

# 單一 process 內共用的元件（正式環境建議用 dependency injection + 連線池管理）
_embedding_provider = LocalHashingEmbedding()
_vector_store = VectorStore("data/vectors.db")
_metrics_storage = MetricsStorage("data/metrics.db")
_api_key_store = ApiKeyStore("data/auth.db")
_document_store = DocumentVersionStore("data/documents.db")


class ChatRequest(BaseModel):
    query: str
    top_k: int = 5
    model: str = "claude-sonnet-5"


class ChatResponse(BaseModel):
    answer: str
    citations: list[dict]
    request_id: str


class CreateApiKeyRequest(BaseModel):
    tenant_id: str
    label: str = ""


class WidgetTokenResponse(BaseModel):
    token: str
    expires_in_seconds: int = 15 * 60


@app.post("/documents")
async def upload_document(
    file: UploadFile = File(...),
    doc_id: str | None = Form(default=None),
    notes: str = Form(default=""),
    tenant_id: str = Depends(require_api_key),
):
    doc_id = doc_id.strip() if doc_id else None
    suffix = Path(file.filename).suffix
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        text = read_file(tmp_path)
        resolved_doc_id = doc_id or None
        if not resolved_doc_id:
            # ingest_text can generate the id, but we need the id before indexing
            # so version metadata can be attached to chunks.
            resolved_doc_id = uuid4().hex
        version = _document_store.next_version(tenant_id=tenant_id, doc_id=resolved_doc_id)
        source_filename = file.filename or Path(tmp_path).name

        result = ingest_text(
            tenant_id=tenant_id,
            text=text,
            source_label=source_filename,
            embedding_provider=_embedding_provider,
            vector_store=_vector_store,
            metrics_storage=_metrics_storage,
            doc_id=resolved_doc_id,
            document_metadata={
                "document_version": version,
                "source_filename": source_filename,
            },
            replace_existing=True,
        )
        version_info = _document_store.record_version(
            tenant_id=tenant_id,
            doc_id=result.doc_id,
            version=version,
            source_filename=source_filename,
            content_text=text,
            chunk_count=result.chunk_count,
            request_id=result.request_id,
            notes=notes,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        Path(tmp_path).unlink(missing_ok=True)

    return {
        "doc_id": result.doc_id,
        "version": version_info["version"],
        "chunk_count": result.chunk_count,
        "request_id": result.request_id,
        "active_version": version_info,
    }


@app.get("/documents")
async def list_documents(
    include_deleted: bool = False,
    tenant_id: str = Depends(require_api_key),
):
    return {
        "documents": _document_store.list_documents(
            tenant_id=tenant_id,
            include_deleted=include_deleted,
        )
    }


@app.get("/documents/{doc_id}/versions")
async def list_document_versions(doc_id: str, tenant_id: str = Depends(require_api_key)):
    return {"doc_id": doc_id, "versions": _document_store.list_versions(tenant_id=tenant_id, doc_id=doc_id)}


@app.post("/documents/{doc_id}/versions/{version}/restore")
async def restore_document_version(
    doc_id: str,
    version: int,
    tenant_id: str = Depends(require_api_key),
):
    version_row = _document_store.get_version(tenant_id=tenant_id, doc_id=doc_id, version=version)
    if not version_row:
        raise HTTPException(status_code=404, detail="找不到指定文件版本")

    new_version = _document_store.next_version(tenant_id=tenant_id, doc_id=doc_id)
    result = ingest_text(
        tenant_id=tenant_id,
        text=version_row["content_text"],
        source_label=version_row["source_filename"],
        embedding_provider=_embedding_provider,
        vector_store=_vector_store,
        metrics_storage=_metrics_storage,
        doc_id=doc_id,
        document_metadata={
            "document_version": new_version,
            "restored_from_version": version,
            "source_filename": version_row["source_filename"],
        },
        replace_existing=True,
    )
    version_info = _document_store.record_version(
        tenant_id=tenant_id,
        doc_id=doc_id,
        version=new_version,
        source_filename=version_row["source_filename"],
        content_text=version_row["content_text"],
        chunk_count=result.chunk_count,
        request_id=result.request_id,
        title=version_row["title"],
        notes=f"restored from v{version}",
    )
    return {
        "doc_id": doc_id,
        "restored_from_version": version,
        "active_version": version_info,
    }


@app.delete("/documents/{doc_id}")
async def delete_document(doc_id: str, tenant_id: str = Depends(require_api_key)):
    _vector_store.delete_document(tenant_id=tenant_id, doc_id=doc_id)
    _document_store.mark_deleted(tenant_id=tenant_id, doc_id=doc_id)
    return {"status": "deleted", "doc_id": doc_id}


@app.post("/auth/widget-token", response_model=WidgetTokenResponse)
async def issue_widget_token(tenant_id: str = Depends(require_api_key)):
    """
    qingyuweb.com 後端在使用者打開頁面、要顯示 widget 時，
    先用自己的 API Key 呼叫這個端點換一個短期 JWT，再把 JWT 交給前端 widget。
    """
    token = create_widget_token(tenant_id=tenant_id)
    return WidgetTokenResponse(token=token)


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest, tenant_id: str = Depends(require_widget_token)):
    results = search(
        tenant_id=tenant_id,
        query=req.query,
        embedding_provider=_embedding_provider,
        vector_store=_vector_store,
        metrics_storage=_metrics_storage,
        top_k=req.top_k,
    )

    result = answer_question(
        query=req.query,
        search_results=results,
        metrics_storage=_metrics_storage,
        model=req.model,
    )

    return ChatResponse(
        answer=result.answer,
        citations=[c.__dict__ for c in result.citations],
        request_id=result.request_id,
    )


@app.post("/admin/api-keys")
async def create_api_key(req: CreateApiKeyRequest, _: None = Depends(require_admin)):
    """建立新租戶的 API Key，金鑰明文只會回傳這一次，請妥善保存"""
    raw_key = _api_key_store.create_key(tenant_id=req.tenant_id, label=req.label)
    return {"api_key": raw_key, "tenant_id": req.tenant_id}


@app.get("/health")
async def health():
    return {"status": "ok"}
