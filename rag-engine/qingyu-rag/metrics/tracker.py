"""
Tracker：用 context manager 包住任一段程式碼，自動計算延遲並存檔。

用法範例：
    storage = MetricsStorage("metrics.db")

    with track(storage, stage=Stage.EMBEDDING, model="local-tfidf", request_id=req_id) as m:
        vectors = embed(texts)
        m.set_tokens(input_tokens=len(texts))
"""
from __future__ import annotations

import time
from contextlib import contextmanager
from typing import Iterator, Optional
from uuid import uuid4

from .billing import estimate_token_usage_cost
from .models import MetricLog, Stage
from .storage import MetricsStorage


class MetricsTracker:
    """在 with 區塊內可呼叫的介面，讓使用者填入 token 數、metadata 等"""

    def __init__(self, log: MetricLog):
        self._log = log

    def set_tokens(self, input_tokens: int = 0, output_tokens: int = 0) -> None:
        self._log.input_tokens = input_tokens
        self._log.output_tokens = output_tokens
        usage_cost = estimate_token_usage_cost(
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            model=self._log.model,
        )
        self._log.cost_usd = usage_cost["total_cost_usd"]
        self._log.metadata["billing"] = usage_cost

    def set_cost(self, cost_usd: float) -> None:
        self._log.cost_usd = cost_usd

    def add_metadata(self, **kwargs) -> None:
        self._log.metadata.update(kwargs)

    @property
    def request_id(self) -> str:
        return self._log.request_id


@contextmanager
def track(
    storage: MetricsStorage,
    stage: Stage,
    model: Optional[str] = None,
    request_id: Optional[str] = None,
) -> Iterator[MetricsTracker]:
    """
    包住一段程式碼，自動記錄延遲；程式拋例外時仍會記錄（success=False）並重新拋出。
    """
    log = MetricLog(
        stage=stage,
        model=model,
        request_id=request_id or uuid4().hex,
    )
    tracker = MetricsTracker(log)
    start = time.perf_counter()
    try:
        yield tracker
    except Exception as e:
        log.success = False
        log.error_message = str(e)
        raise
    finally:
        log.latency_ms = (time.perf_counter() - start) * 1000
        storage.save(log)
