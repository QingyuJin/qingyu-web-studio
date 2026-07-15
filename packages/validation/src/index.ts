import { z } from "zod";

export const organizationIdSchema = z.string().uuid();

export const invitationInputSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(320),
  role: z.enum(["admin", "manager", "staff", "customer"]),
});

export type InvitationInput = z.infer<typeof invitationInputSchema>;
