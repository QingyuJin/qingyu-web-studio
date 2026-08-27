interface ReviewCandidate {
  productId: string | null;
  productName: string;
  quantity: number | null;
  unit: string | null;
  issue?: string | null;
}

export function prepareFlowOrderReview(
  candidates: ReviewCandidate[],
  products: Array<{ id: string; unit: string }>,
) {
  const counts = new Map<string, number>();
  for (const candidate of candidates) if (candidate.productId) counts.set(candidate.productId, (counts.get(candidate.productId) ?? 0) + 1);
  const items: Array<{ productId: string; quantity: number; unit: string }> = [];
  const unresolved: Array<{ productName: string; issue: string }> = [];
  for (const candidate of candidates) {
    const product = products.find((item) => item.id === candidate.productId);
    if (candidate.issue || !product || !candidate.quantity || !Number.isFinite(candidate.quantity) || candidate.quantity <= 0 || candidate.unit !== product.unit || (counts.get(product.id) ?? 0) !== 1) {
      unresolved.push({ productName: candidate.productName, issue: candidate.issue || "商品、數量或單位未能安全帶入，請依原文手動新增或修正。" });
    } else {
      items.push({ productId: product.id, quantity: candidate.quantity, unit: product.unit });
    }
  }
  return { items, unresolved };
}
