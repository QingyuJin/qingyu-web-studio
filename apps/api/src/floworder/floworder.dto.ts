import { ApiProperty } from "@nestjs/swagger";
import {
  flowOrderCancellationSchema,
  flowOrderConfirmationSchema,
  flowOrderMessageInputSchema,
  flowOrderMessageStatusSchema,
  flowOrderModificationSchema,
  type FlowOrderCancellationInput,
  type FlowOrderConfirmationInput,
  type FlowOrderMessageInput,
  type FlowOrderMessageStatusInput,
  type FlowOrderModificationInput,
} from "@qingyu/validation";

export class FlowOrderMessageDto implements FlowOrderMessageInput {
  static readonly schema = flowOrderMessageInputSchema;

  @ApiProperty({ format: "uuid", required: false })
  declare customerId?: string;

  @ApiProperty({ example: "牛五花15箱，雞腿排8箱，星期五送新營" })
  declare text: string;

  @ApiProperty({ enum: ["web", "line", "api"], default: "web" })
  declare source: "web" | "line" | "api";

  @ApiProperty({ example: "message-01J123456789" })
  declare idempotencyKey: string;
}

export class FlowOrderMessageStatusDto implements FlowOrderMessageStatusInput {
  static readonly schema = flowOrderMessageStatusSchema;

  @ApiProperty({ enum: ["read", "processing", "archived"] })
  declare status: "read" | "processing" | "archived";
}

export class FlowOrderConfirmationDto implements FlowOrderConfirmationInput {
  static readonly schema = flowOrderConfirmationSchema;

  @ApiProperty({ type: "array" })
  declare items: FlowOrderConfirmationInput["items"];

  @ApiProperty({ format: "date", nullable: true })
  declare deliveryDate: string | null;

  @ApiProperty()
  declare deliveryAddress: string;

  @ApiProperty({ nullable: true, required: false })
  declare notes?: string | null;

  @ApiProperty()
  declare idempotencyKey: string;
}

export class FlowOrderCancellationDto implements FlowOrderCancellationInput {
  static readonly schema = flowOrderCancellationSchema;

  @ApiProperty()
  declare reason: string;

  @ApiProperty()
  declare idempotencyKey: string;
}

export class FlowOrderModificationDto implements FlowOrderModificationInput {
  static readonly schema = flowOrderModificationSchema;

  @ApiProperty({ type: "array" })
  declare items: FlowOrderModificationInput["items"];

  @ApiProperty({ format: "date", nullable: true })
  declare deliveryDate: string | null;

  @ApiProperty()
  declare deliveryAddress: string;

  @ApiProperty({ nullable: true, required: false })
  declare notes?: string | null;

  @ApiProperty()
  declare idempotencyKey: string;
}
