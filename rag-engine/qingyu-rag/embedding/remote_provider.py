"""
正式環境建議使用的雲端 embedding provider 範例。

需要 OPENAI_API_KEY 環境變數；如果你們改用 Voyage AI / Cohere，
只要照這個介面另外寫一個 class 即可，上層程式碼完全不用改。
"""
from __future__ import annotations

import os

from .base import EmbeddingProvider


class OpenAIEmbeddingProvider(EmbeddingProvider):
    def __init__(self, model: str = "text-embedding-3-small", api_key: str | None = None):
        try:
            from openai import OpenAI
        except ImportError as e:
            raise ImportError("請先安裝 openai 套件：pip install openai") from e

        self._model = model
        self._client = OpenAI(api_key=api_key or os.environ.get("OPENAI_API_KEY"))
        self._dim = 1536 if "small" in model else 3072

    @property
    def dimension(self) -> int:
        return self._dim

    def embed(self, texts: list[str]) -> list[list[float]]:
        resp = self._client.embeddings.create(model=self._model, input=texts)
        return [item.embedding for item in resp.data]
