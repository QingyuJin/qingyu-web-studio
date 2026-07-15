"""
Generation 模組：把檢索到的切片組成 prompt，呼叫 Claude 產生答案，
並在答案中標註引用來源（對應到哪個文件的哪個切片）。
"""
from __future__ import annotations

import os
from dataclasses import dataclass
from uuid import uuid4

from anthropic import Anthropic

from metrics import MetricsStorage, track
from metrics.models import Stage
from vectorstore import SearchResult

_SYSTEM_PROMPT = """你是企業文件知識庫的問答助理。
請只根據下方提供的「參考資料」回答使用者的問題，不要使用參考資料以外的知識。
如果參考資料中沒有足夠資訊回答問題，請明確說明「目前上傳的文件中找不到相關資訊」，不要編造答案。

回答時，請在句子後面用 [數字] 標註你引用的是哪一段參考資料，數字對應下方參考資料的編號。
例如：「本公司的請假需提前三天申請 [1]。」
"""


@dataclass
class Citation:
    index: int
    doc_id: str
    chunk_id: str
    text_snippet: str


@dataclass
class AnswerResult:
    answer: str
    citations: list[Citation]
    request_id: str


def _build_context(results: list[SearchResult]) -> str:
    blocks = []
    for i, r in enumerate(results, start=1):
        blocks.append(f"[{i}] (doc_id={r.doc_id})\n{r.text}")
    return "\n\n".join(blocks)


def answer_question(
    *,
    query: str,
    search_results: list[SearchResult],
    metrics_storage: MetricsStorage,
    model: str = "claude-sonnet-5",
    api_key: str | None = None,
    request_id: str | None = None,
) -> AnswerResult:
    request_id = request_id or uuid4().hex

    if not search_results:
        return AnswerResult(
            answer="目前上傳的文件中找不到相關資訊。",
            citations=[],
            request_id=request_id,
        )

    context = _build_context(search_results)
    client = Anthropic(api_key=api_key or os.environ.get("ANTHROPIC_API_KEY"))

    with track(metrics_storage, stage=Stage.GENERATION, model=model, request_id=request_id) as m:
        response = client.messages.create(
            model=model,
            max_tokens=1024,
            system=_SYSTEM_PROMPT,
            messages=[
                {
                    "role": "user",
                    "content": f"參考資料：\n{context}\n\n問題：{query}",
                }
            ],
        )
        answer_text = "".join(
            block.text for block in response.content if getattr(block, "type", None) == "text"
        )
        m.set_tokens(
            input_tokens=response.usage.input_tokens,
            output_tokens=response.usage.output_tokens,
        )

    citations = [
        Citation(
            index=i,
            doc_id=r.doc_id,
            chunk_id=r.id,
            text_snippet=r.text[:120],
        )
        for i, r in enumerate(search_results, start=1)
        if f"[{i}]" in answer_text
    ]

    return AnswerResult(answer=answer_text, citations=citations, request_id=request_id)
