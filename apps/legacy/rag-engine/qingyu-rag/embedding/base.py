"""
Embedding 模組：把文字轉成向量。

用抽象介面 EmbeddingProvider 讓上層程式碼不用管底層用哪個服務，
方便之後從本地示範用的 HashingProvider 換成正式的 OpenAI / Voyage / Cohere 等 API。
"""
from __future__ import annotations

from abc import ABC, abstractmethod


class EmbeddingProvider(ABC):
    """向量化服務的統一介面"""

    @property
    @abstractmethod
    def dimension(self) -> int:
        """向量維度"""

    @abstractmethod
    def embed(self, texts: list[str]) -> list[list[float]]:
        """把一批文字轉成向量，回傳順序與輸入一致"""

    def embed_one(self, text: str) -> list[float]:
        return self.embed([text])[0]
