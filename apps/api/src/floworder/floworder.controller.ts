import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { organizationIdSchema } from "@qingyu/validation";
import type { Request, Response } from "express";
import { z } from "zod";
import { ZodValuePipe } from "../common/zod-validation.pipe.js";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard.js";
import { FlowOrderAccessGuard } from "./floworder-access.guard.js";
import {
  FlowOrderCancellationDto,
  FlowOrderConfirmationDto,
  FlowOrderMessageDto,
  FlowOrderMessageStatusDto,
  FlowOrderModificationDto,
} from "./floworder.dto.js";
import { FlowOrderService } from "./floworder.service.js";

const recordIdSchema = z.string().uuid();
const searchSchema = z.string().trim().max(120).optional();
const messageFilterSchema = z.enum(["all", "unread", "read", "processing", "converted", "archived"]).optional();
const optionalOrganizationIdSchema = organizationIdSchema.optional();

@ApiTags("floworder-demo")
@Controller("floworder/demo")
export class FlowOrderDemoController {
  constructor(private readonly service: FlowOrderService) {}

  @Post("sandboxes")
  @ApiOperation({ summary: "Create an isolated, database-backed FlowOrder demo sandbox" })
  createSandbox(@Req() request: Request) {
    return this.service.createDemoSandbox(request.ip || "unknown-client");
  }

  @Get("session")
  @ApiOperation({ summary: "Resolve an existing FlowOrder demo sandbox" })
  getSession(@Headers("x-floworder-demo-token") token: string | undefined) {
    return this.service.getDemoSession(token);
  }
}

@ApiTags("floworder")
@UseGuards(SupabaseAuthGuard)
@Controller("floworder")
export class FlowOrderSessionController {
  constructor(private readonly service: FlowOrderService) {}

  @Get("session")
  @ApiOperation({ summary: "Resolve the signed-in user's FlowOrder workspace" })
  getSession(
    @Req() request: Request,
    @Query("organization", new ZodValuePipe(optionalOrganizationIdSchema)) organizationId: string | undefined,
  ) {
    if (!request.auth) throw new Error("Authentication guard invariant failed");
    return this.service.getAuthenticatedSession(request.auth.userId, organizationId);
  }
}

@ApiTags("floworder")
@UseGuards(FlowOrderAccessGuard)
@Controller("organizations/:organizationId/floworder")
export class FlowOrderController {
  constructor(private readonly service: FlowOrderService) {}

  @Get("snapshot")
  @ApiOperation({ summary: "Load the current role-scoped FlowOrder workspace" })
  getSnapshot(
    @Param("organizationId", new ZodValuePipe(organizationIdSchema)) _organizationId: string,
    @Query("search", new ZodValuePipe(searchSchema)) search: string | undefined,
    @Query("status", new ZodValuePipe(messageFilterSchema)) status: string | undefined,
    @Req() request: Request,
  ) {
    return this.service.getSnapshot(this.access(request), {
      ...(search ? { search } : {}),
      ...(status ? { status } : {}),
    });
  }

  @Post("messages")
  createMessage(
    @Param("organizationId", new ZodValuePipe(organizationIdSchema)) _organizationId: string,
    @Body() input: FlowOrderMessageDto,
    @Req() request: Request,
  ) {
    return this.service.createMessage(this.access(request), input);
  }

  @Patch("messages/:messageId/status")
  updateMessageStatus(
    @Param("messageId", new ZodValuePipe(recordIdSchema)) messageId: string,
    @Body() input: FlowOrderMessageStatusDto,
    @Req() request: Request,
  ) {
    return this.service.updateMessageStatus(this.access(request), messageId, input);
  }

  @Post("messages/:messageId/parse")
  parseMessage(
    @Param("messageId", new ZodValuePipe(recordIdSchema)) messageId: string,
    @Req() request: Request,
  ) {
    return this.service.parseMessage(this.access(request), messageId);
  }

  @Post("messages/:messageId/confirm")
  confirmOrder(
    @Param("messageId", new ZodValuePipe(recordIdSchema)) messageId: string,
    @Body() input: FlowOrderConfirmationDto,
    @Req() request: Request,
  ) {
    return this.service.confirmOrder(this.access(request), messageId, input);
  }

  @Post("orders/:orderId/cancel")
  cancelOrder(
    @Param("orderId", new ZodValuePipe(recordIdSchema)) orderId: string,
    @Body() input: FlowOrderCancellationDto,
    @Req() request: Request,
  ) {
    return this.service.cancelOrder(this.access(request), orderId, input);
  }

  @Patch("orders/:orderId")
  modifyOrder(
    @Param("orderId", new ZodValuePipe(recordIdSchema)) orderId: string,
    @Body() input: FlowOrderModificationDto,
    @Req() request: Request,
  ) {
    return this.service.modifyOrder(this.access(request), orderId, input);
  }

  @Get("orders/:orderId/pdf")
  async getOrderPdf(
    @Param("orderId", new ZodValuePipe(recordIdSchema)) orderId: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const pdf = await this.service.getOrderPdf(this.access(request), orderId);
    response
      .setHeader("content-type", "application/pdf")
      .setHeader("content-disposition", `attachment; filename="${pdf.filename}"`)
      .setHeader("cache-control", "private, no-store")
      .send(pdf.buffer);
  }

  private access(request: Request) {
    if (!request.floworderAccess) throw new Error("FlowOrder access guard invariant failed");
    return request.floworderAccess;
  }
}
