"""
讀取不同格式的文件內容，統一轉成純文字。
"""
from __future__ import annotations

from pathlib import Path


def read_file(path: str) -> str:
    ext = Path(path).suffix.lower()

    if ext in (".txt", ".md"):
        return Path(path).read_text(encoding="utf-8", errors="ignore")

    if ext == ".pdf":
        from pypdf import PdfReader

        reader = PdfReader(path)
        return "\n\n".join(page.extract_text() or "" for page in reader.pages)

    if ext == ".docx":
        import docx

        doc = docx.Document(path)
        return "\n".join(p.text for p in doc.paragraphs)

    raise ValueError(f"不支援的檔案格式：{ext}")
