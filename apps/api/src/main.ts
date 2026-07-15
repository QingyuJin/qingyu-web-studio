import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import type { ApiEnvironment } from "@qingyu/config/api";
import { AppModule } from "./app.module.js";
import { HttpExceptionFilter } from "./common/http-exception.filter.js";
import { StructuredLogger } from "./common/structured-logger.service.js";
import { API_ENVIRONMENT } from "./environment.js";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(StructuredLogger);
  const environment = app.get<ApiEnvironment>(API_ENVIRONMENT);
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.enableCors({ origin: environment.WEB_ORIGIN, credentials: true });
  app.enableShutdownHooks();

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Qingyu Platform API")
    .setDescription("Organization-scoped platform foundation API")
    .setVersion("2.0")
    .addBearerAuth()
    .build();
  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, swaggerConfig));

  await app.listen(environment.PORT, "0.0.0.0");
  logger.log({ event: "api_started", port: environment.PORT }, "bootstrap");
}

void bootstrap();
