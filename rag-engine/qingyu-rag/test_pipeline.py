"""
端到端測試：上傳 -> 切片 -> 向量化 -> 搜尋 四個模組（不含 LLM 問答，避免需要 API key）
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from embedding import LocalHashingEmbedding
from ingestion import ingest_document
from metrics import MetricsStorage
from retrieval import search
from vectorstore import VectorStore

TEST_DIR = Path(__file__).parent / "data" / "test"
TEST_DIR.mkdir(parents=True, exist_ok=True)

sample_file = TEST_DIR / "leave_policy.txt"
sample_file.write_text(
    "請假規定\n\n"
    "員工請事假需提前三天向主管申請，並填寫請假單。\n"
    "病假可事後補交診斷證明，最遲於返回工作日提交。\n"
    "特休假需提前一週申請，並經主管核准後方可休假。\n\n"
    "報銷規定\n\n"
    "出差費用需於出差結束後七天內檢附發票報銷。\n"
    "交通費以實際搭乘票根為準，未附票根者不予報銷。\n",
    encoding="utf-8",
)

embedding_provider = LocalHashingEmbedding()
vector_store = VectorStore(str(TEST_DIR / "vectors.db"))
metrics_storage = MetricsStorage(str(TEST_DIR / "metrics.db"))

TENANT = "test-tenant"

print("=== 1. 上傳 + 切片 + 向量化 ===")
result = ingest_document(
    tenant_id=TENANT,
    file_path=str(sample_file),
    embedding_provider=embedding_provider,
    vector_store=vector_store,
    metrics_storage=metrics_storage,
    chunk_size=100,
    chunk_overlap=20,
)
print(f"doc_id={result.doc_id}, chunk_count={result.chunk_count}")
assert result.chunk_count > 0, "切片數量應該 > 0"

print("\n=== 2. 語意搜尋 ===")
results = search(
    tenant_id=TENANT,
    query="請假需要提前幾天申請？",
    embedding_provider=embedding_provider,
    vector_store=vector_store,
    metrics_storage=metrics_storage,
    top_k=3,
)
for r in results:
    print(f"  score={r.score:.4f} text={r.text[:40]!r}")
assert len(results) > 0, "搜尋結果應該 > 0"

print("\n=== 3. Metrics 彙總 ===")
summary = metrics_storage.summary()
for row in summary:
    print(f"  stage={row['stage']:<15} count={row['request_count']:<3} "
          f"avg_latency_ms={row['avg_latency_ms']:.2f} tokens={row['total_input_tokens']}")
assert len(summary) >= 3, "應該至少有 upload/chunking/embedding 三個 stage 的紀錄"

print("\n全部測試通過 ✅")
