import type { CatalogProduct, ParsedOrderResult } from "./floworder.types.js";

export interface OrderParserInput {
  text: string;
  customerName: string;
  deliveryAddresses: string[];
  products: CatalogProduct[];
  today: string;
  timezone: string;
}

export type OrderParserResponse =
  | {
      configured: true;
      provider: string;
      model: string;
      durationMs: number;
      result: ParsedOrderResult;
    }
  | {
      configured: false;
      provider: string;
      model: string;
      durationMs: number;
      errorCode: "AI_PROVIDER_NOT_CONFIGURED";
    };

export interface OrderParser {
  parse(input: OrderParserInput): Promise<OrderParserResponse>;
}

export const ORDER_PARSER = Symbol("ORDER_PARSER");

export const RULE_PARSER_INFO = {
  kind: "rules",
  provider: "rules",
  model: "floworder-rules-v1",
  available: true,
  requiresApiKey: false,
  // Older clients must not offer the paid-AI button during a rolling deploy.
  openaiConfigured: false,
} as const;
