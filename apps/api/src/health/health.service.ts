import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service.js";

@Injectable()
export class HealthService {
  constructor(private readonly supabase: SupabaseService) {}

  liveness() {
    return { status: "ok" as const };
  }

  async readiness() {
    if (!(await this.supabase.isReady())) {
      throw new ServiceUnavailableException({
        code: "DEPENDENCY_NOT_READY",
        message: "A required dependency is not ready",
      });
    }
    return { status: "ready" as const };
  }
}
