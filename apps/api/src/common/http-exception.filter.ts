import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  type ExceptionFilter,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { StructuredLogger } from "./structured-logger.service.js";

interface ErrorPayload {
  code: string;
  message: string;
  details?: unknown;
}

function toErrorPayload(exception: unknown, status: number): ErrorPayload {
  if (!(exception instanceof HttpException)) {
    return { code: "INTERNAL_ERROR", message: "Internal server error" };
  }

  const response = exception.getResponse();
  if (typeof response === "string") {
    return { code: `HTTP_${status}`, message: response };
  }

  const body = response as Record<string, unknown>;
  const code = typeof body.code === "string" ? body.code : `HTTP_${status}`;
  const rawMessage = body.message;
  const message = Array.isArray(rawMessage)
    ? rawMessage.filter((item): item is string => typeof item === "string").join("; ")
    : typeof rawMessage === "string"
      ? rawMessage
      : exception.message;
  return body.details === undefined ? { code, message } : { code, message, details: body.details };
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: StructuredLogger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const error = toErrorPayload(exception, status);

    if (status >= 500) {
      this.logger.error(
        { event: "http_request_failed", requestId: request.requestId, error: exception },
        undefined,
        HttpExceptionFilter.name,
      );
    }

    response.status(status).json({
      error,
      requestId: request.requestId,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
    });
  }
}
