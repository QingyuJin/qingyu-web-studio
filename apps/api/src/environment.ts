import { parseApiEnvironment, type ApiEnvironment } from "@qingyu/config/api";

export const API_ENVIRONMENT = Symbol("API_ENVIRONMENT");

export const apiEnvironmentProvider = {
  provide: API_ENVIRONMENT,
  useFactory: (): ApiEnvironment => parseApiEnvironment(process.env),
};
