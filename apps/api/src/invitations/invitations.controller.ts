import { Body, Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { organizationIdSchema } from "@qingyu/validation";
import type { Request } from "express";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard.js";
import { ZodValuePipe } from "../common/zod-validation.pipe.js";
import { InvitationDto } from "./invitation.dto.js";
import { InvitationsService } from "./invitations.service.js";

@ApiTags("invitations")
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller("organizations/:organizationId/invitations")
export class InvitationsController {
  constructor(private readonly invitations: InvitationsService) {}

  @Post()
  @ApiOperation({ summary: "Invite a member to an organization" })
  @ApiCreatedResponse({ schema: { example: { id: "uuid", status: "pending" } } })
  create(
    @Param("organizationId", new ZodValuePipe(organizationIdSchema)) organizationId: string,
    @Body() input: InvitationDto,
    @Req() request: Request,
  ) {
    if (!request.auth) throw new Error("Authentication guard invariant failed");
    return this.invitations.create(organizationId, request.auth.userId, input);
  }
}
