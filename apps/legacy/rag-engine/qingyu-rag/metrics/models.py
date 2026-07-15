"""
資料模型定義

一筆 MetricLog 代表 RAG pipeline 中「一個階段」的一次執行紀錄，
例如一次 chunking、一次 embedding、一次向量搜尋、或一次 LLM 問答。
"""
from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from typing import Any, Optional
from uuid import uuid4

from pydantic import BaseModel, Field


class Stage(str, Enum):
    """RAG pipeline 各階段名稱"""
    UPLOAD = "upload"
    CHUNKING = "chunking"
    EMBEDDING = "embedding"
    VECTOR_SEARCH = "vector_search"
    GENERATION = "generation"  # AI 問答 / LLM 生成
    OTHER = "other"


class MetricLog(BaseModel):
    """單筆延遲 / token 紀錄"""

    id: str = Field(default_factory=lambda: uuid4().hex)
    request_id: str = Field(
        default_factory=lambda: uuid4().hex,
        description="同一次使用者請求（可能跨多個 stage）共用同一個 request_id，方便串接追蹤",
    )
    stage: Stage
    model: Optional[str] = Field(default=None, description="使用的模型名稱，例如 claude-sonnet-5")

    # token 相關
    input_tokens: int = 0
    output_tokens: int = 0

    @property
    def total_tokens(self) -> int:
        return self.input_tokens + self.output_tokens

    # 延遲相關（毫秒）
    latency_ms: float = 0.0

    # 是否成功
    success: bool = True
    error_message: Optional[str] = None

    # 估算成本（USD），由呼叫端依模型定價自行換算後填入；不填則為 None
    cost_usd: Optional[float] = None

    # 額外 metadata，例如文件 ID、切片數量、查詢字串長度等
    metadata: dict[str, Any] = Field(default_factory=dict)

    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Config:
        use_enum_values = True
