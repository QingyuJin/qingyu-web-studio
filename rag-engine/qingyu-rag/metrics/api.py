"""
提供查詢 metrics 的 API：彙總統計 + 明細列表
"""
from __future__ import annotations

from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Query

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


@router.get("/logs")
def get_logs(
    stage: Optional[Stage] = None,
    request_id: Optional[str] = None,
    limit: int = Query(default=100, le=1000),
    offset: int = 0,
):
    """查詢明細紀錄，可依 stage 或 request_id 篩選"""
    return _storage.query_logs(stage=stage, request_id=request_id, limit=limit, offset=offset)
