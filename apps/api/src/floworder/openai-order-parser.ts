import { Inject, Injectable } from "@nestjs/common";
import type { ApiEnvironment } from "@qingyu/config/api";
import { z } from "zod";
import { API_ENVIRONMENT } from "../environment.js";
import type { OrderParser, OrderParserInput, OrderParserResponse } from "./order-parser.js";

const parsedOrderSchema = z.object({
  customerName: z.string().nullable(),
  items: z.array(z.object({
    productId: z.string().uuid().nullable(),
    sku: z.string().nullable(),
    productName: z.string(),
    quantity: z.number().positive().nullable(),
    unit: z.string().nullable(),
    confidence: z.number().min(0).max(1),
    issue: z.string().nullable(),
  })).max(100),
  deliveryDate: z.string().nullable(),
  deliveryAddress: z.string().nullable(),
  notes: z.string().nullable(),
  confidence: z.number().min(0).max(1),
  needsReview: z.boolean(),
  issues: z.array(z.string()).max(50),
});

const responseSchema = z.object({
  output: z.array(z.object({
    type: z.string(),
    content: z.array(z.object({ type: z.string(), text: z.string().optional() })).optional(),
  })),
});

const outputJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    customerName: { type: ["string", "null"] },
    items: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          productId: { type: ["string", "null"] },
          sku: { type: ["string", "null"] },
          productName: { type: "string" },
          quantity: { type: ["number", "null"] },
          unit: { type: ["string", "null"] },
          confidence: { type: "number", minimum: 0, maximum: 1 },
          issue: { type: ["string", "null"] },
        },
        required: ["productId", "sku", "productName", "quantity", "unit", "confidence", "issue"],
      },
    },
    deliveryDate: { type: ["string", "null"] },
    deliveryAddress: { type: ["string", "null"] },
    notes: { type: ["string", "null"] },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    needsReview: { type: "boolean" },
    issues: { type: "array", items: { type: "string" } },
  },
  required: ["customerName", "items", "deliveryDate", "deliveryAddress", "notes", "confidence", "needsReview", "issues"],
} as const;

@Injectable()
export class OpenAiOrderParser implements OrderParser {
  constructor(@Inject(API_ENVIRONMENT) private readonly environment: ApiEnvironment) {}

  async parse(input: OrderParserInput): Promise<OrderParserResponse> {
    const startedAt = Date.now();
    if (!this.environment.OPENAI_API_KEY) {
      return {
        configured: false,
        provider: "openai",
        model: this.environment.OPENAI_MODEL,
        durationMs: Date.now() - startedAt,
        errorCode: "AI_PROVIDER_NOT_CONFIGURED",
      };
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.environment.OPENAI_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: this.environment.OPENAI_MODEL,
        store: false,
        instructions: [
          "你是台灣 B2B 食品批發訂單解析器。只能使用提供的商品目錄配對商品。",
          "不確定的商品不得臆測 productId；請設為 null、needsReview=true 並說明 issue。",
          "相對日期以提供的今天與 Asia/Taipei 解讀，輸出 YYYY-MM-DD。",
          "不要建立訂單，只回傳供人工確認的結構化結果。",
        ].join("\n"),
        input: JSON.stringify(input),
        text: {
          format: {
            type: "json_schema",
            name: "floworder_message_parse",
            strict: true,
            schema: outputJsonSchema,
          },
        },
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`OPENAI_RESPONSE_${response.status}`);

    const parsedResponse = responseSchema.parse(await response.json());
    const outputText = parsedResponse.output
      .flatMap((item) => item.content ?? [])
      .find((content) => content.type === "output_text")?.text;
    if (!outputText) throw new Error("OPENAI_OUTPUT_MISSING");

    return {
      configured: true,
      provider: "openai",
      model: this.environment.OPENAI_MODEL,
      durationMs: Date.now() - startedAt,
      result: parsedOrderSchema.parse(JSON.parse(outputText)),
    };
  }
}

