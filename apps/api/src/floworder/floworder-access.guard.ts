import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { extractBearerToken } from "@qingyu/auth";
import { flowOrderRoleSchema } from "@qingyu/validation";
import type { Request } from "express";
import { SupabaseService } from "../supabase/supabase.service.js";
import { FlowOrderRepository } from "./floworder.repository.js";

@Injectable()
export class FlowOrderAccessGuard implements CanActivate {
  constructor(
    private readonly repository: FlowOrderRepository,
    private readonly supabase: SupabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const rawOrganizationId = request.params.organizationId;
    const organizationId = Array.isArray(rawOrganizationId) ? rawOrganizationId[0] : rawOrganizationId;
    if (!organizationId) throw this.unauthorized();

    const demoToken = request.header("x-floworder-demo-token");
    if (demoToken) {
      const requestedRole = flowOrderRoleSchema.catch("admin").parse(request.header("x-floworder-role"));
      const access = await this.repository.resolveDemoAccess(demoToken, requestedRole);
      if (!access) throw this.unauthorized();
      if (access.organizationId !== organizationId) throw this.forbidden();
      request.floworderAccess = access;
      return true;
    }

    const bearerToken = extractBearerToken(request.header("authorization"));
    if (!bearerToken) throw this.unauthorized();
    const user = await this.supabase.getUser(bearerToken);
    if (!user) throw this.unauthorized();
    const membershipRole = await this.supabase.getMembershipRole(user.id, organizationId);
    if (!membershipRole) throw this.forbidden();
    request.auth = { userId: user.id, email: user.email ?? null };
    request.floworderAccess = await this.repository.resolveAuthenticatedAccess(user.id, organizationId, membershipRole);
    return true;
  }

  private unauthorized(): UnauthorizedException {
    return new UnauthorizedException({
      code: "FLOWORDER_AUTHENTICATION_REQUIRED",
      message: "A valid user session or demo sandbox is required",
    });
  }

  private forbidden(): ForbiddenException {
    return new ForbiddenException({
      code: "FLOWORDER_ORGANIZATION_ACCESS_DENIED",
      message: "This identity cannot access the requested FlowOrder workspace",
    });
  }
}
