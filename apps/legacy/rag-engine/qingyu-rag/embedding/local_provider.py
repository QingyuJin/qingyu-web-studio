"""
本地離線向量化實作，使用 scikit-learn 的 HashingVectorizer。

優點：不需要呼叫外部 API、不需要下載模型權重，開發/測試階段可以直接跑。
缺點：語意理解能力遠不如 OpenAI/Voyage 等正式 embedding 模型，
      正式上線建議換成 OpenAIEmbeddingProvider 或其他雲端 API 實作（見 remote.py 範例）。
"""
from __future__ import annotations

from sklearn.feature_extraction.text import HashingVectorizer

from .base import EmbeddingProvider


class LocalHashingEmbedding(EmbeddingProvider):
    def __init__(self, n_features: int = 512):
        self._n_features = n_features
        self._vectorizer = HashingVectorizer(
            n_features=n_features,
            alternate_sign=False,
            norm="l2",
        )

    @property
    def dimension(self) -> int:
        return self._n_features

    def embed(self, texts: list[str]) -> list[list[float]]:
        matrix = self._vectorizer.transform(texts)
        return matrix.toarray().tolist()
