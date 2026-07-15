import { MiddlewareConsumer, Module, type NestModule, RequestMethod } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { SupabaseAuthGuard } from "./auth/supabase-auth.guard.js";
import { RequestIdMiddleware } from "./common/request-id.middleware.js";
import { StructuredLogger } from "./common/structured-logger.service.js";
import { ZodValidationPipe } from "./common/zod-validation.pipe.js";
import { apiEnvironmentProvider } from "./environment.js";
import { HealthController } from "./health/health.controller.js";
import { HealthService } from "./health/health.service.js";
import { InvitationsController } from "./invitations/invitations.controller.js";
import { InvitationsService } from "./invitations/invitations.service.js";
import { SupabaseService } from "./supabase/supabase.service.js";

@Module({
  controllers: [HealthController, InvitationsController],
  providers: [
    apiEnvironmentProvider,
    StructuredLogger,
    RequestIdMiddleware,
    SupabaseService,
    SupabaseAuthGuard,
    HealthService,
    InvitationsService,
    { provide: APP_PIPE, useClass: ZodValidationPipe },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
