import { Injectable, type NestMiddleware } from "@nestjs/common";
import { createRequestId } from "@qingyu/observability";
import type { NextFunction, Request, Response } from "express";
import { StructuredLogger } from "./structured-logger.service.js";

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(private readonly logger: StructuredLogger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = createRequestId(request.header("x-request-id"));
    request.requestId = requestId;
    response.setHeader("x-request-id", requestId);
    const startedAt = performance.now();

    response.once("finish", () => {
      this.logger.log(
        {
          event: "http_request_completed",
          requestId,
          method: request.method,
          path: request.originalUrl,
          statusCode: response.statusCode,
          durationMs: Math.round((performance.now() - startedAt) * 100) / 100,
        },
        RequestIdMiddleware.name,
      );
    });
    next();
  }
}
