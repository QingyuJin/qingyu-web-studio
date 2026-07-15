import { Injectable, type LoggerService } from "@nestjs/common";
import { createLogRecord, type LogLevel } from "@qingyu/observability";

@Injectable()
export class StructuredLogger implements LoggerService {
  log(message: unknown, context?: string): void {
    this.write("info", message, context);
  }

  error(message: unknown, trace?: string, context?: string): void {
    const metadata = trace ? { trace } : undefined;
    this.write("error", message, context, metadata);
  }

  warn(message: unknown, context?: string): void {
    this.write("warn", message, context);
  }

  debug(message: unknown, context?: string): void {
    this.write("debug", message, context);
  }

  verbose(message: unknown, context?: string): void {
    this.write("debug", message, context);
  }

  private write(
    level: LogLevel,
    message: unknown,
    context?: string,
    metadata?: Readonly<Record<string, unknown>>,
  ): void {
    const text = typeof message === "string" ? message : JSON.stringify(message);
    const fields = {
      ...(context ? { context } : {}),
      ...(metadata ? { metadata } : {}),
    };
    const record = createLogRecord(level, text, fields);
    const output = JSON.stringify(record);

    if (level === "error") console.error(output);
    else if (level === "warn") console.warn(output);
    else console.log(output);
  }
}
