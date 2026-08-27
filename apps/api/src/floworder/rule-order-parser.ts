import { Injectable } from "@nestjs/common";
import type { CatalogProduct, ParsedOrderItem } from "./floworder.types.js";
import { RULE_PARSER_INFO, type OrderParser, type OrderParserInput, type OrderParserResponse } from "./order-parser.js";

function normalize(value: string): string {
  return value.normalize("NFKC").replaceAll("臺", "台").toLowerCase();
}

function compact(value: string): string {
  return normalize(value).replace(/\s+/g, "");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeUnit(value: string): string {
  const unit = compact(value);
  if (["公斤", "千克", "kg"].includes(unit)) return "kg";
  if (["公克", "克", "g"].includes(unit)) return "g";
  if (["公升", "l"].includes(unit)) return "l";
  if (["毫升", "ml"].includes(unit)) return "ml";
  return unit;
}

function parseNumber(value: string): number {
  if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
  const digits: Record<string, number> = { 零: 0, 〇: 0, 一: 1, 二: 2, 兩: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  const scales: Record<string, number> = { 十: 10, 百: 100, 千: 1000 };
  const [whole = "", fraction] = value.split(/[點点]/);
  let total = 0;
  let digit = 0;
  let lastScale = Infinity;
  for (const character of whole) {
    if (character in digits) {
      if (digit !== 0) return NaN;
      digit = digits[character] ?? 0;
    } else {
      const scale = scales[character];
      if (!scale || scale >= lastScale) return NaN;
      total += (digit || 1) * scale;
      digit = 0;
      lastScale = scale;
    }
  }
  if (lastScale >= 100 && lastScale !== Infinity && digit > 0 && !/[零〇]/.test(whole)) return NaN;
  const decimal = fraction ? Number(`0.${[...fraction].map((character) => digits[character]).join("")}`) : 0;
  return total + digit + decimal;
}

function validDate(year: number, month: number, day: number): string | null {
  const date = new Date(Date.UTC(year, month - 1, day));
  return year >= 2000 && year <= 2100 && date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? date.toISOString().slice(0, 10) : null;
}

function parseDeliveryDate(text: string, today: string, issues: string[]) {
  const values = new Set<string>();
  const tokens: string[] = [];
  let invalid = false;
  const base = new Date(`${today}T00:00:00Z`);
  const baseValid = !Number.isNaN(base.valueOf()) && base.toISOString().slice(0, 10) === today;
  function add(token: string, date: string | null) {
    tokens.push(token);
    if (!date || !baseValid || date < today) invalid = true;
    else values.add(date);
  }
  for (const match of text.matchAll(/(?<!\d)(\d{4})[-/年](\d{1,2})[-/月](\d{1,2})(?:日|號)?(?!\d)/g)) {
    add(match[0], validDate(Number(match[1]), Number(match[2]), Number(match[3])));
  }
  for (const match of text.matchAll(/(?<![\d/年-])(\d{1,2})[月/](\d{1,2})(?:日|號)?(?![\d/])/g)) {
    add(match[0], baseValid ? validDate(base.getUTCFullYear(), Number(match[1]), Number(match[2])) : null);
  }
  const offsets: Record<string, number> = { 今天: 0, 明天: 1, 後天: 2, 大後天: 3 };
  for (const match of text.matchAll(/大後天|今天|明天|後天/g)) {
    const date = new Date(base.valueOf());
    date.setUTCDate(date.getUTCDate() + (offsets[match[0]] ?? 0));
    add(match[0], baseValid ? date.toISOString().slice(0, 10) : null);
  }
  for (const match of text.matchAll(/(下|本|這)(?:週|星期|禮拜)([一二三四五六日天])/g)) {
    const weekday = "一二三四五六日".indexOf(match[2] === "天" ? "日" : match[2] ?? "");
    const date = new Date(base.valueOf());
    date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7) + weekday + (match[1] === "下" ? 7 : 0));
    add(match[0], baseValid ? date.toISOString().slice(0, 10) : null);
  }
  const remaining = tokens.reduce((value, token) => value.replaceAll(token, " "), text);
  if (/(?:週|星期|禮拜)[一二三四五六日天]|月底|下個?月|下禮拜|下週|下星期/.test(remaining)) {
    invalid = true;
    issues.push("配送日期不明確，請填寫年月日，或明確指定本週／下週幾。");
  }
  if (invalid) issues.push("日期無效、已過期或無法確定，請人工核對。");
  if (values.size > 1) issues.push("訊息包含多個配送日期，不會自動選擇其中一天。");
  if (!values.size && !invalid) issues.push("未提供可辨識的配送日期，請人工填寫。");
  return { value: !invalid && values.size === 1 ? [...values][0] ?? null : null, tokens };
}

function parseAddress(text: string, addresses: string[], issues: string[]): string | null {
  const known = [...new Set(addresses.filter((address) => compact(address).length > 0 && compact(text).includes(compact(address))))];
  const explicit = [...text.matchAll(/(?:送貨地址|配送地址|地址)\s*[:：]\s*([^，,;；。\n]+)/g)].map((match) => match[1]?.trim() ?? "").filter(Boolean);
  const candidates = [...new Set([...known, ...explicit].map(compact))];
  if (candidates.length > 1) {
    issues.push("訊息包含多個配送地址，請人工選擇。");
    return null;
  }
  if (known.length) return known[0] ?? null;
  if (explicit.length === 1) {
    issues.push("配送地址不是已登錄地址，請核對完整內容。");
    return explicit[0] ?? null;
  }
  issues.push("未能確定配送地址，請核對客戶地址或重新填寫。");
  return null;
}

function resolveProduct(reference: string, products: CatalogProduct[]): { product: CatalogProduct | null; issue: string | null } {
  const normalized = normalize(reference);
  const cleanReference = (value: string) => compact(value).replace(/^(?:(?:請|麻煩|幫我|我要|要|訂購|訂|加訂|再加|加|給我|商品|品項)\s*[:：]?)+/, "").replace(/[()（）:：\s]+/g, "").replace(/[x×]$/, "");
  const skuTokens = [...normalized.matchAll(/(?<![a-z0-9-])([a-z][a-z0-9]*-\d+)(?![a-z0-9-])/g)].map((match) => match[1]);
  const bySku = products.filter((product) => skuTokens.includes(normalize(product.sku)));
  const byName = products.filter((product) => compact(product.name).length > 1 && compact(reference).includes(compact(product.name)));
  if (skuTokens.length) {
    if (new Set(skuTokens).size !== 1 || bySku.length !== 1) return { product: null, issue: "SKU 不存在或同時指定多個 SKU，請選擇商品。" };
    if (byName.some((product) => product.id !== bySku[0]?.id)) return { product: null, issue: "商品名稱與 SKU 不一致，請人工核對。" };
    const nameReference = cleanReference(normalized.replace(/(?:sku\s*[:：]?\s*)?[a-z][a-z0-9]*-\d+/g, ""));
    if (nameReference && !compact(bySku[0]?.name ?? "").includes(nameReference)) return { product: null, issue: "SKU 旁的名稱無法核對，請確認原文商品。" };
    return { product: bySku[0] ?? null, issue: null };
  }
  const longest = byName.filter((product) => !byName.some((other) => other.id !== product.id && compact(other.name).length > compact(product.name).length && compact(other.name).includes(compact(product.name))));
  const query = cleanReference(reference);
  if (longest.length === 1 && query === compact(longest[0]?.name ?? "")) return { product: longest[0] ?? null, issue: null };
  if (longest.length === 1) return { product: null, issue: "商品旁有其他未辨識內容，請確認商品與數量的對應。" };
  const candidates = longest.length ? longest : query.length >= 2 ? products.filter((product) => compact(product.name).includes(query)) : [];
  if (candidates.length === 1) return { product: candidates[0] ?? null, issue: null };
  if (candidates.length > 1) return { product: null, issue: `名稱對應多個商品：${candidates.slice(0, 4).map((product) => `${product.name} (${product.sku})`).join("、")}，請指定 SKU。` };
  return { product: null, issue: "無法對應商品目錄，請人工選擇；不會猜測商品。" };
}

const quantityPattern = /(-?\d+(?:\.\d+)?|[零〇一二兩两三四五六七八九十百千]+(?:[點点][零〇一二三四五六七八九]+)?)\s*(公斤|千克|公克|公升|毫升|台斤|kg|ml|箱|盒|包|袋|瓶|罐|桶|件|顆|個|片|條|尾|隻|支|組|盤|斤|克|g|l)(?![a-z])/gi;
const complexOrder = /不要|不用|不需|取消|退貨|退回|退掉|刪除|改成|改為|改到|改單|不是|減少|換成|扣除|加到|各|合計|總共|左右|大約|至少|最多|不超過|約\s*[\d一二三四五六七八九十]|\d\s*(?:到|至|[-~～])\s*\d|或/;

@Injectable()
export class RuleBasedOrderParser implements OrderParser {
  async parse(input: OrderParserInput): Promise<OrderParserResponse> {
    const startedAt = Date.now();
    const text = input.text.normalize("NFKC").replaceAll("臺", "台").replace(/(?<=\d),(?=\d{3}(?:\D|$))/g, "");
    const issues: string[] = [];
    const delivery = parseDeliveryDate(text, input.today, issues);
    const deliveryAddress = parseAddress(text, input.deliveryAddresses, issues);
    const items: ParsedOrderItem[] = [];
    const notes: string[] = [];
    const addUnknown = (reference: string, issue: string) => items.push({ productId: null, sku: null, productName: reference.trim().slice(0, 160), quantity: null, unit: null, confidence: 0, issue });
    const isMetadata = (value: string) => /^(?:送貨|配送|到貨|交貨|收貨|送到|送達|地址|日期|今天|明天|後天|大後天|本週|這週|下週|週|星期|禮拜|下星期|本星期|下禮拜)/.test(value.trim());
    function stripMetadata(value: string) {
      let result = delivery.tokens.reduce((current, token) => current.replaceAll(token, " "), value);
      for (const address of input.deliveryAddresses) if (compact(address)) result = result.replace(new RegExp([...compact(address)].map(escapeRegex).join("\\s*"), "gi"), " ");
      return result.trim();
    }
    for (const rawClause of text.split(/[，,、;；。!！\n]+/)) {
      const clause = rawClause.trim();
      if (!clause) continue;
      if (/^(?:備註|附註|注意)\s*[:：]/.test(clause)) { notes.push(clause); continue; }
      if (isMetadata(clause) || !stripMetadata(clause)) continue;
      if (complexOrder.test(delivery.tokens.reduce((value, token) => value.replaceAll(token, " "), clause))) {
        addUnknown(clause, "含取消、修改、範圍或分配語句，請依原文人工處理。");
        continue;
      }
      const quantities = [...clause.matchAll(quantityPattern)];
      if (!quantities.length) {
        if (!/^(?:謝謝|感謝|請確認|麻煩了)[!！\s]*$/.test(clause)) addUnknown(clause, "缺少可辨識的數量與單位，請人工填寫。");
        continue;
      }
      let cursor = 0;
      for (const match of quantities) {
        const reference = clause.slice(cursor, match.index).trim();
        cursor = match.index + match[0].length;
        const resolved = resolveProduct(reference, input.products);
        const quantity = parseNumber(match[1] ?? "");
        const unit = match[2] ?? "";
        let issue = resolved.issue;
        if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 1_000_000 || Math.abs(quantity * 1000 - Math.round(quantity * 1000)) > 0.000001) issue = "數量必須大於 0、至多三位小數，且不可超過 1,000,000。";
        else if (resolved.product && normalizeUnit(unit) !== normalizeUnit(resolved.product.unit)) issue = `原文單位「${unit}」與商品單位「${resolved.product.unit}」不同，不會自動換算。`;
        items.push({ productId: resolved.product?.id ?? null, sku: resolved.product?.sku ?? null, productName: resolved.product?.name ?? (reference.slice(0, 160) || match[0]), quantity: issue ? null : quantity, unit: resolved.product?.unit ?? unit, confidence: issue ? 0 : 1, issue });
      }
      const tail = stripMetadata(clause.slice(cursor));
      if (tail && !isMetadata(tail) && !/^(?:送|到|到貨|送達|謝謝|感謝|請確認|\s)+$/.test(tail)) addUnknown(tail, "數量後仍有未辨識內容，請核對原始訊息。");
    }
    const counts = new Map<string, number>();
    for (const item of items) if (item.productId) counts.set(item.productId, (counts.get(item.productId) ?? 0) + 1);
    for (const item of items) {
      if (item.productId && (counts.get(item.productId) ?? 0) > 1) { item.issue = "相同商品重複出現，不會自動合併數量，請人工核對。"; item.quantity = null; item.confidence = 0; }
      if (item.issue) issues.push(`${item.productName}：${item.issue}`);
    }
    if (!items.length) issues.push("未找到可辨識的商品與數量，請人工新增品項。");
    if (items.length > 100) issues.push("品項超過 100 筆，請拆分訊息並核對未列出的原文。");
    return {
      configured: true,
      provider: RULE_PARSER_INFO.provider,
      model: RULE_PARSER_INFO.model,
      durationMs: Date.now() - startedAt,
      result: {
        customerName: input.customerName || null,
        items: items.slice(0, 100),
        deliveryDate: delivery.value,
        deliveryAddress,
        notes: notes.length ? notes.join("\n").slice(0, 2000) : null,
        confidence: issues.length ? 0 : 1,
        needsReview: true,
        issues: [...new Set(issues)].slice(0, 50),
      },
    };
  }
}
