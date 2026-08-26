import type { FlowOrderRole } from "@qingyu/validation";

export interface FlowOrderAccess {
  kind: "authenticated" | "demo";
  organizationId: string;
  actorUserId: string | null;
  role: FlowOrderRole;
  customerId: string | null;
  salesAccountId: string | null;
}

export interface CatalogProduct {
  id: string;
  sku: string;
  name: string;
  specification: string;
  unit: string;
}

export interface ParsedOrderItem {
  productId: string | null;
  sku: string | null;
  productName: string;
  quantity: number | null;
  unit: string | null;
  confidence: number;
  issue: string | null;
}

export interface ParsedOrderResult {
  customerName: string | null;
  items: ParsedOrderItem[];
  deliveryDate: string | null;
  deliveryAddress: string | null;
  notes: string | null;
  confidence: number;
  needsReview: boolean;
  issues: string[];
}

