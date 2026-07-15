"""
Chunking 模組：把長文件切成適合向量化與檢索的小段落。

使用「遞迴字元切分」策略：優先在段落/句子邊界切開，
並支援 overlap（重疊）避免語意在切點被截斷。
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Optional
from uuid import uuid4

# 依優先順序嘗試的切分符號：先段落、再句子、最後才強制斷字
_SEPARATORS = ["\n\n", "\n", "。", ". ", "！", "!", "？", "?", "，", ", ", " ", ""]


@dataclass
class Chunk:
    id: str = field(default_factory=lambda: uuid4().hex)
    doc_id: str = ""
    text: str = ""
    chunk_index: int = 0
    start_char: int = 0
    end_char: int = 0
    metadata: dict = field(default_factory=dict)


def _split_by_separator(text: str, separator: str) -> list[str]:
    if separator == "":
        return list(text)
    parts = text.split(separator)
    # 切完之後把分隔符加回去（除了最後一段），避免語意/標點遺失
    return [p + separator for p in parts[:-1]] + [parts[-1]]


def _recursive_split(text: str, chunk_size: int, separators: list[str]) -> list[str]:
    if len(text) <= chunk_size:
        return [text] if text else []

    if not separators:
        # 沒有分隔符可用了，強制依長度切
        return [text[i : i + chunk_size] for i in range(0, len(text), chunk_size)]

    sep, *rest_separators = separators
    pieces = _split_by_separator(text, sep)

    chunks: list[str] = []
    buffer = ""
    for piece in pieces:
        if len(buffer) + len(piece) <= chunk_size:
            buffer += piece
        else:
            if buffer:
                chunks.append(buffer)
            if len(piece) > chunk_size:
                # 這一小塊本身還是太長，繼續往下一層分隔符遞迴
                chunks.extend(_recursive_split(piece, chunk_size, rest_separators))
                buffer = ""
            else:
                buffer = piece
    if buffer:
        chunks.append(buffer)
    return chunks


def chunk_text(
    text: str,
    doc_id: str,
    chunk_size: int = 500,
    chunk_overlap: int = 50,
    metadata: Optional[dict] = None,
) -> list[Chunk]:
    """
    將文字切成多個 Chunk。

    - chunk_size: 每個切片的最大字元數
    - chunk_overlap: 相鄰切片之間重疊的字元數，避免語意被硬生生切斷
    """
    if chunk_overlap >= chunk_size:
        raise ValueError("chunk_overlap 必須小於 chunk_size")

    raw_pieces = _recursive_split(text, chunk_size, _SEPARATORS)

    # 套用 overlap：把上一段的尾巴接到下一段開頭
    merged: list[str] = []
    for i, piece in enumerate(raw_pieces):
        if i > 0 and chunk_overlap > 0:
            prev_tail = raw_pieces[i - 1][-chunk_overlap:]
            piece = prev_tail + piece
        merged.append(piece)

    chunks: list[Chunk] = []
    cursor = 0
    for idx, piece in enumerate(merged):
        start = text.find(piece[:20], cursor) if piece else cursor
        start = max(start, 0)
        end = start + len(piece)
        chunks.append(
            Chunk(
                doc_id=doc_id,
                text=piece.strip(),
                chunk_index=idx,
                start_char=start,
                end_char=end,
                metadata=dict(metadata or {}),
            )
        )
        cursor = end

    return [c for c in chunks if c.text]
