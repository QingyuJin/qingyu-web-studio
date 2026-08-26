interface PdfOrderData {
  order: Record<string, unknown>;
  customer: Record<string, unknown> | null;
  sales: Record<string, unknown> | null;
  items: Array<Record<string, unknown>>;
}

function utf16Hex(value: string): string {
  const bytes: number[] = [0xfe, 0xff];
  for (const character of value) {
    const codePoint = character.codePointAt(0) ?? 0;
    if (codePoint <= 0xffff) {
      bytes.push((codePoint >> 8) & 0xff, codePoint & 0xff);
    } else {
      const adjusted = codePoint - 0x10000;
      const high = 0xd800 + (adjusted >> 10);
      const low = 0xdc00 + (adjusted & 0x3ff);
      bytes.push((high >> 8) & 0xff, high & 0xff, (low >> 8) & 0xff, low & 0xff);
    }
  }
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function money(value: unknown): string {
  const amount = typeof value === "number" ? value : Number(value ?? 0);
  return new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }).format(amount);
}

function textLine(text: string, x: number, y: number, size = 11): string {
  return `BT /F1 ${size} Tf ${x} ${y} Td <${utf16Hex(text)}> Tj ET`;
}

export function buildFlowOrderPdf(data: PdfOrderData): Buffer {
  const order = data.order;
  const lines = [
    textLine("海港食品有限公司", 50, 790, 20),
    textLine("正式訂單", 455, 790, 18),
    textLine(`訂單編號：${String(order.order_number ?? "")}`, 50, 750, 11),
    textLine(`客戶：${String(data.customer?.name ?? "")}`, 50, 728, 11),
    textLine(`配送日期：${String(order.delivery_date ?? "待確認")}`, 330, 750, 11),
    textLine(`負責業務：${String(data.sales?.name ?? "未指派")}`, 330, 728, 11),
    textLine(`配送地址：${String(order.delivery_address ?? "")}`, 50, 700, 10),
    "0.75 w 50 680 m 545 680 l S",
    textLine("品項", 50, 660, 10),
    textLine("規格", 245, 660, 10),
    textLine("數量", 355, 660, 10),
    textLine("單價", 430, 660, 10),
    textLine("小計", 500, 660, 10),
  ];

  data.items.slice(0, 18).forEach((item, index) => {
    const y = 635 - index * 25;
    lines.push(
      textLine(String(item.product_name ?? ""), 50, y, 9),
      textLine(String(item.specification ?? ""), 245, y, 9),
      textLine(`${String(item.quantity ?? "")} ${String(item.unit ?? "")}`, 355, y, 9),
      textLine(money(item.unit_price), 430, y, 9),
      textLine(money(item.line_total), 500, y, 9),
    );
  });

  lines.push(
    "0.75 w 330 145 m 545 145 l S",
    textLine(`未稅小計：${money(order.subtotal)}`, 340, 120, 11),
    textLine(`折扣：${money(order.discount_total)}`, 340, 98, 11),
    textLine(`訂單總額：${money(order.total)}`, 340, 70, 14),
    textLine("本文件由 FlowOrder 依資料庫訂單即時產生", 50, 40, 8),
  );

  const stream = `${lines.join("\n")}\n`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type0 /BaseFont /MSung-Light /Encoding /UniCNS-UTF16-H /DescendantFonts [6 0 R] >>",
    `<< /Length ${Buffer.byteLength(stream, "ascii")} >>\nstream\n${stream}endstream`,
    "<< /Type /Font /Subtype /CIDFontType0 /BaseFont /MSung-Light /CIDSystemInfo << /Registry (Adobe) /Ordering (CNS1) /Supplement 7 >> /FontDescriptor 7 0 R /DW 1000 >>",
    "<< /Type /FontDescriptor /FontName /MSung-Light /Flags 6 /FontBBox [-160 -249 1015 888] /ItalicAngle 0 /Ascent 888 /Descent -249 /CapHeight 700 /StemV 93 >>",
  ];

  let pdf = "%PDF-1.4\n%FlowOrder\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "ascii"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf, "ascii");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  pdf += offsets.slice(1).map((offset) => `${offset.toString().padStart(10, "0")} 00000 n \n`).join("");
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf, "ascii");
}

