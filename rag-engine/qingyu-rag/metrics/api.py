"""
提供查詢 metrics 的 API：彙總統計 + 明細列表
"""
from __future__ import annotations

from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Query

from .billing import pricing_for_model, usd_to_twd_rate
from .models import Stage
from .storage import MetricsStorage

router = APIRouter(prefix="/metrics", tags=["metrics"])
_storage = MetricsStorage("data/metrics.db")


def get_storage() -> MetricsStorage:
    return _storage


@router.get("/summary")
def get_summary(
    start: Optional[datetime] = None,
    end: Optional[datetime] = None,
):
    """依 stage 分組的彙總統計：次數、平均/最大/最小延遲、token 用量、成本、成功率"""
    return _storage.summary(start=start, end=end)


@router.get("/billing")
def get_billing(
    start: Optional[datetime] = None,
    end: Optional[datetime] = None,
):
    """依 token 用量整理帳務估算，可接租戶後台或月結報表。"""
    stages = _storage.summary(start=start, end=end)
    twd_rate = usd_to_twd_rate()
    total_input_tokens = sum(row.get("total_input_tokens") or 0 for row in stages)
    total_output_tokens = sum(row.get("total_output_tokens") or 0 for row in stages)
    total_tokens = sum(row.get("total_tokens") or 0 for row in stages)
    total_cost_usd = sum(row.get("total_cost_usd") or 0 for row in stages)

    enriched_stages = []
    for row in stages:
        cost_usd = row.get("total_cost_usd") or 0
        enriched_stages.append(
            {
                **row,
                "estimated_cost_twd": round(cost_usd * twd_rate, 4),
            }
        )

    return {
        "currency": "USD",
        "pricing": pricing_for_model().__dict__,
        "usd_to_twd": twd_rate,
        "total": {
            "input_tokens": total_input_tokens,
            "output_tokens": total_output_tokens,
            "tokens": total_tokens,
            "cost_usd": round(total_cost_usd, 8),
            "estimated_cost_twd": round(total_cost_usd * twd_rate, 4),
        },
        "stages": enriched_stages,
    }


@router.get("/logs")
def get_logs(
    stage: Optional[Stage] = None,
    request_id: Optional[str] = None,
    limit: int = Query(default=100, le=1000),
    offset: int = 0,
):
    """查詢明細紀錄，可依 stage 或 request_id 篩選"""
    return _storage.query_logs(stage=stage, request_id=request_id, limit=limit, offset=offset)
