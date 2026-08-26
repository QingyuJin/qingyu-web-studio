import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { ApiEnvironment } from "@qingyu/config/api";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { z } from "zod";
import { API_ENVIRONMENT } from "../environment.js";

const membershipRoleSchema = z.object({
  role: z.object({ slug: z.enum(["admin", "manager", "staff", "sales", "customer"]) }),
});

const permissionRowsSchema = z.array(
  z.object({ permission: z.object({ key: z.string() }) }),
);

@Injectable()
export class SupabaseService {
  private readonly admin: SupabaseClient;

  constructor(@Inject(API_ENVIRONMENT) private readonly environment: ApiEnvironment) {
    this.admin = createClient(environment.SUPABASE_URL, environment.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  async isReady(): Promise<boolean> {
    const { error } = await this.admin.from("permissions").select("id", { head: true, count: "exact" }).limit(1);
    return !error;
  }

  async getUser(accessToken: string): Promise<User | null> {
    const { data, error } = await this.admin.auth.getUser(accessToken);
    return error ? null : data.user;
  }

  async getMembershipRole(userId: string, organizationId: string) {
    const { data, error } = await this.admin
      .from("organization_memberships")
      .select("role:roles!organization_memberships_role_id_fkey(slug)")
      .eq("organization_id", organizationId)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw this.databaseError();
    if (!data) return null;
    return membershipRoleSchema.parse(data).role.slug;
  }

  async hasPermission(userId: string, organizationId: string, permissionKey: string): Promise<boolean> {
    const { data: membership, error: membershipError } = await this.admin
      .from("organization_memberships")
      .select("role_id")
      .eq("organization_id", organizationId)
      .eq("user_id", userId)
      .maybeSingle();

    if (membershipError) throw this.databaseError();
    if (!membership || typeof membership.role_id !== "string") return false;

    const { data, error } = await this.admin
      .from("role_permissions")
      .select("permission:permissions!role_permissions_permission_id_fkey(key)")
      .eq("organization_id", organizationId)
      .eq("role_id", membership.role_id);

    if (error) throw this.databaseError();
    return permissionRowsSchema.parse(data ?? []).some(({ permission }) => permission.key === permissionKey);
  }

  async findRoleId(organizationId: string, role: string): Promise<string | null> {
    const { data, error } = await this.admin
      .from("roles")
      .select("id")
      .eq("organization_id", organizationId)
      .eq("slug", role)
      .maybeSingle();
    if (error) throw this.databaseError();
    return data && typeof data.id === "string" ? data.id : null;
  }

  async createInvitationRecord(input: {
    organizationId: string;
    email: string;
    roleId: string;
    invitedBy: string;
  }): Promise<string> {
    const { data, error } = await this.admin
      .from("invitations")
      .insert({
        organization_id: input.organizationId,
        email: input.email,
        role_id: input.roleId,
        invited_by: input.invitedBy,
      })
      .select("id")
      .single();
    if (error || !data) throw this.databaseError();
    return z.string().uuid().parse(data.id);
  }

  async deleteInvitationRecord(invitationId: string): Promise<void> {
    await this.admin.from("invitations").delete().eq("id", invitationId);
  }

  async sendAuthInvitation(email: string): Promise<User> {
    const redirectTo = `${this.environment.WEB_ORIGIN}/auth/callback?next=/dashboard`;
    const { data, error } = await this.admin.auth.admin.inviteUserByEmail(email, { redirectTo });
    if (error || !data.user) throw new Error("AUTH_INVITATION_FAILED");
    return data.user;
  }

  async completeInvitation(input: {
    invitationId: string;
    invitedUserId: string;
    organizationId: string;
    actorUserId: string;
    email: string;
    roleId: string;
  }): Promise<void> {
    const { error: updateError } = await this.admin
      .from("invitations")
      .update({ invited_user_id: input.invitedUserId })
      .eq("id", input.invitationId)
      .eq("organization_id", input.organizationId);
    if (updateError) throw this.databaseError();

    const { error: auditError } = await this.admin.from("audit_logs").insert({
      organization_id: input.organizationId,
      actor_user_id: input.actorUserId,
      action: "organization.invitation.created",
      target_type: "invitation",
      target_id: input.invitationId,
      metadata: { email: input.email, role_id: input.roleId },
    });
    if (auditError) throw this.databaseError();
  }

  private databaseError(): InternalServerErrorException {
    return new InternalServerErrorException({
      code: "DATABASE_OPERATION_FAILED",
      message: "The database operation could not be completed",
    });
  }
}
