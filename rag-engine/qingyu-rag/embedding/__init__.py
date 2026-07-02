from .base import EmbeddingProvider
from .local_provider import LocalHashingEmbedding

__all__ = ["EmbeddingProvider", "LocalHashingEmbedding"]

try:
    from .remote_provider import OpenAIEmbeddingProvider  # noqa: F401
    __all__.append("OpenAIEmbeddingProvider")
except ImportError:
    pass
