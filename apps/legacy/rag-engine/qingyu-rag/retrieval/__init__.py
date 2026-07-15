"""
Retrieval 模組：把使用者的問題轉成向量，並在 VectorStore 裡搜尋最相關的切片。
"""
from __future__ import annotations

from uuid import uuid4

from embedding.base import EmbeddingProvider
from metrics import MetricsStorage, track
from metrics.models import Stage
from vectorstore import SearchResult, VectorStore


def search(
    *,
    tenant_id: str,
    query: str,
    embedding_provider: EmbeddingProvider,
    vector_store: VectorStore,
    metrics_storage: MetricsStorage,
    top_k: int = 5,
    request_id: str | None = None,
) -> list[SearchResult]:
    request_id = request_id or uuid4().hex

    with track(
        metrics_storage,
        stage=Stage.EMBEDDING,
        model=getattr(embedding_provider, "_model", embedding_provider.__class__.__name__),
        request_id=request_id,
    ) as m:
        query_vector = embedding_provider.embed_one(query)
        m.set_tokens(input_tokens=len(query) // 4)
        m.add_metadata(purpose="query_embedding")

    with track(metrics_storage, stage=Stage.VECTOR_SEARCH, request_id=request_id) as m:
        results = vector_store.search(tenant_id=tenant_id, query_vector=query_vector, top_k=top_k)
        m.add_metadata(result_count=len(results), top_k=top_k)

    return results
