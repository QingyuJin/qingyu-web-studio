import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import type { ApiEnvironment } from "@qingyu/config/api";
import type { Request, Response } from "express";
import { AppModule } from "../src/app.module.js";
import { HttpExceptionFilter } from "../src/common/http-exception.filter.js";
import { StructuredLogger } from "../src/common/structured-logger.service.js";
import { API_ENVIRONMENT } from "../src/environment.js";

type ExpressApplication = (request: Request, response: Response) => void;

let serverPromise: Promise<ExpressApplication> | undefined;

async function createServer(): Promise<ExpressApplication> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(StructuredLogger);
  const environment = app.get<ApiEnvironment>(API_ENVIRONMENT);
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.enableCors({ origin: environment.WEB_ORIGIN, credentials: true });
  await app.init();
  return app.getHttpAdapter().getInstance() as ExpressApplication;
}

export default async function handler(request: Request, response: Response): Promise<void> {
  serverPromise ??= createServer();
  const server = await serverPromise;
  server(request, response);
}
