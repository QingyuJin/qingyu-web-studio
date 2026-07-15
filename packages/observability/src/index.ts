import { randomUUID } from "node:crypto";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogRecord {
  timestamp: string;
  level: LogLevel;
  message: string;
  requestId?: string;
  context?: string;
  metadata?: Readonly<Record<string, unknown>>;
}

export function createRequestId(incoming?: string): string {
  const value = incoming?.trim();
  return value && /^[A-Za-z0-9._:-]{8,128}$/.test(value) ? value : randomUUID();
}

export function createLogRecord(
  level: LogLevel,
  message: string,
  fields: Omit<LogRecord, "timestamp" | "level" | "message"> = {},
): LogRecord {
  return { timestamp: new Date().toISOString(), level, message, ...fields };
}

export function serializeError(error: unknown): Readonly<Record<string, unknown>> {
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack };
  }
  return { message: "Unknown error" };
}
