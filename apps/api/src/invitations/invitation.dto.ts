import { ApiProperty } from "@nestjs/swagger";
import { invitationInputSchema, type InvitationInput } from "@qingyu/validation";

export class InvitationDto implements InvitationInput {
  static readonly schema = invitationInputSchema;

  @ApiProperty({ format: "email" })
  declare email: string;

  @ApiProperty({ enum: ["admin", "manager", "staff", "customer"] })
  declare role: InvitationInput["role"];
}
