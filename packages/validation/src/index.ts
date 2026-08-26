import { z } from "zod";

export const organizationIdSchema = z.string().uuid();

export const invitationInputSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(320),
  role: z.enum(["admin", "manager", "staff", "sales", "customer"]),
});

export type InvitationInput = z.infer<typeof invitationInputSchema>;

export const flowOrderRoleSchema = z.enum(["customer", "sales", "admin"]);
export type FlowOrderRole = z.infer<typeof flowOrderRoleSchema>;

export const flowOrderMessageInputSchema = z.object({
  customerId: z.string().uuid().optional(),
  text: z.string().trim().min(1).max(4_000),
  source: z.enum(["web", "line", "api"]).default("web"),
  idempotencyKey: z.string().trim().min(8).max(200),
});
export type FlowOrderMessageInput = z.infer<typeof flowOrderMessageInputSchema>;

export const flowOrderMessageStatusSchema = z.object({
  status: z.enum(["read", "processing", "archived"]),
});
export type FlowOrderMessageStatusInput = z.infer<typeof flowOrderMessageStatusSchema>;

export const flowOrderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.coerce.number().positive().max(100_000),
  unit: z.string().trim().min(1).max(20),
});

export const flowOrderConfirmationSchema = z.object({
  items: z.array(flowOrderItemSchema).min(1).max(100),
  deliveryDate: z.iso.date().nullable(),
  deliveryAddress: z.string().trim().min(1).max(500),
  notes: z.string().trim().max(2_000).nullable().optional(),
  idempotencyKey: z.string().trim().min(8).max(200),
});
export type FlowOrderConfirmationInput = z.infer<typeof flowOrderConfirmationSchema>;

export const flowOrderModificationSchema = flowOrderConfirmationSchema;
export type FlowOrderModificationInput = z.infer<typeof flowOrderModificationSchema>;

export const flowOrderCancellationSchema = z.object({
  reason: z.string().trim().min(2).max(500),
  idempotencyKey: z.string().trim().min(8).max(200),
});
export type FlowOrderCancellationInput = z.infer<typeof flowOrderCancellationSchema>;
