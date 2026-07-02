"""
Ingestion 模組：把「上傳」到「向量存進資料庫」串成一條 pipeline。

流程：讀檔 -> 切片(chunking) -> 向量化(embedding) -> 存進 VectorStore，
每個階段都用 metrics.track() 紀錄延遲/token，方便之後做用量分析。
"""
from __future__ import annotations

from dataclasses import dataclass
from uuid import uuid4

from chunking import chunk_text
from embedding.base import EmbeddingProvider
from metrics import MetricsStorage, track
from metrics.models import Stage
from vectorstore import VectorStore

from .reader import read_file


@dataclass
class IngestResult:
    doc_id: str
    chunk_count: int
    request_id: str


def ingest_document(
    *,
    tenant_id: str,
    file_path: str,
    embedding_provider: EmbeddingProvider,
    vector_store: VectorStore,
    metrics_storage: MetricsStorage,
    chunk_size: int = 500,
    chunk_overlap: int = 50,
    doc_id: str | None = None,
    request_id: str | None = None,
) -> IngestResult:
    doc_id = doc_id or uuid4().hex
    request_id = request_id or uuid4().hex

    # 1. 讀檔 + 上傳階段紀錄
    with track(metrics_storage, stage=Stage.UPLOAD, request_id=request_id) as m:
        text = read_file(file_path)
        m.add_metadata(doc_id=doc_id, char_count=len(text))

    # 2. 切片
    with track(metrics_storage, stage=Stage.CHUNKING, request_id=request_id) as m:
        chunks = chunk_text(
            text,
            doc_id=doc_id,
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            metadata={"tenant_id": tenant_id, "source_file": file_path},
        )
        m.add_metadata(chunk_count=len(chunks))

    if not chunks:
        return IngestResult(doc_id=doc_id, chunk_count=0, request_id=request_id)

    # 3. 向量化
    with track(
        metrics_storage,
        stage=Stage.EMBEDDING,
        model=getattr(embedding_provider, "_model", embedding_provider.__class__.__name__),
        request_id=request_id,
    ) as m:
        vectors = embedding_provider.embed([c.text for c in chunks])
        m.set_tokens(input_tokens=sum(len(c.text) for c in chunks) // 4)  # 粗略估算
        m.add_metadata(vector_count=len(vectors), dimension=embedding_provider.dimension)

    # 4. 存進向量庫
    vector_store.add_batch(
        tenant_id=tenant_id,
        doc_id=doc_id,
        items=[
            (c.id, c.chunk_index, c.text, vec, {**c.metadata, "start_char": c.start_char, "end_char": c.end_char})
            for c, vec in zip(chunks, vectors)
        ],
    )

    return IngestResult(doc_id=doc_id, chunk_count=len(chunks), request_id=request_id)
