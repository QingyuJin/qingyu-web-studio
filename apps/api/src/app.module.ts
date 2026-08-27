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
import { FlowOrderAccessGuard } from "./floworder/floworder-access.guard.js";
import { FlowOrderController, FlowOrderDemoController, FlowOrderSessionController } from "./floworder/floworder.controller.js";
import { FlowOrderRepository } from "./floworder/floworder.repository.js";
import { FlowOrderService } from "./floworder/floworder.service.js";
import { RuleBasedOrderParser } from "./floworder/rule-order-parser.js";
import { ORDER_PARSER } from "./floworder/order-parser.js";
import { SupabaseService } from "./supabase/supabase.service.js";

@Module({
  controllers: [HealthController, InvitationsController, FlowOrderDemoController, FlowOrderSessionController, FlowOrderController],
  providers: [
    apiEnvironmentProvider,
    StructuredLogger,
    RequestIdMiddleware,
    SupabaseService,
    SupabaseAuthGuard,
    HealthService,
    InvitationsService,
    FlowOrderRepository,
    FlowOrderAccessGuard,
    FlowOrderService,
    RuleBasedOrderParser,
    { provide: ORDER_PARSER, useExisting: RuleBasedOrderParser },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
