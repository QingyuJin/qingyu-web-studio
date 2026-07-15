import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import type { InvitationInput } from "@qingyu/validation";
import { SupabaseService } from "../supabase/supabase.service.js";

type OrganizationRole = "admin" | "manager" | "staff" | "customer";

export function canInviteRole(actorRole: OrganizationRole, invitedRole: OrganizationRole): boolean {
  if (actorRole === "admin") return true;
  return actorRole === "manager" && (invitedRole === "staff" || invitedRole === "customer");
}

@Injectable()
export class InvitationsService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(organizationId: string, actorUserId: string, input: InvitationInput) {
    const actorRole = await this.supabase.getMembershipRole(actorUserId, organizationId);
    if (!actorRole) throw this.forbidden();

    const hasPermission = await this.supabase.hasPermission(actorUserId, organizationId, "members.invite");
    if (!hasPermission || !canInviteRole(actorRole, input.role)) throw this.forbidden();

    const roleId = await this.supabase.findRoleId(organizationId, input.role);
    if (!roleId) {
      throw new NotFoundException({ code: "ROLE_NOT_FOUND", message: "The requested organization role does not exist" });
    }

    const invitationId = await this.supabase.createInvitationRecord({
      organizationId,
      email: input.email,
      roleId,
      invitedBy: actorUserId,
    });

    try {
      const invitedUser = await this.supabase.sendAuthInvitation(input.email);
      await this.supabase.completeInvitation({
        invitationId,
        invitedUserId: invitedUser.id,
        organizationId,
        actorUserId,
        email: input.email,
        roleId,
      });
    } catch {
      await this.supabase.deleteInvitationRecord(invitationId);
      throw new ConflictException({
        code: "INVITATION_NOT_SENT",
        message: "The invitation could not be sent",
      });
    }

    return { id: invitationId, status: "pending" as const };
  }

  private forbidden(): ForbiddenException {
    return new ForbiddenException({
      code: "ORGANIZATION_ACCESS_DENIED",
      message: "Active organization membership and invitation permission are required",
    });
  }
}
