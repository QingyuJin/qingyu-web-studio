import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HealthService } from "./health.service.js";

@ApiTags("health")
@Controller()
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get("health")
  @ApiOperation({ summary: "Process liveness" })
  @ApiOkResponse({ schema: { example: { status: "ok" } } })
  liveness() {
    return this.health.liveness();
  }

  @Get("ready")
  @ApiOperation({ summary: "Dependency readiness" })
  @ApiOkResponse({ schema: { example: { status: "ready" } } })
  readiness() {
    return this.health.readiness();
  }
}
