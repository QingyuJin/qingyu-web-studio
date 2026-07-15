import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { extractBearerToken } from "@qingyu/auth";
import type { Request } from "express";
import { SupabaseService } from "../supabase/supabase.service.js";

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = extractBearerToken(request.header("authorization"));
    if (!token) throw this.unauthorized();

    const user = await this.supabase.getUser(token);
    if (!user) throw this.unauthorized();

    request.auth = { userId: user.id, email: user.email ?? null };
    return true;
  }

  private unauthorized(): UnauthorizedException {
    return new UnauthorizedException({
      code: "AUTHENTICATION_REQUIRED",
      message: "A valid Supabase access token is required",
    });
  }
}
