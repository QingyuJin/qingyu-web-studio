import { BadRequestException, Injectable, type ArgumentMetadata, type PipeTransform } from "@nestjs/common";
import { z, ZodType } from "zod";

interface ZodDtoConstructor {
  schema: ZodType;
}

function isZodDtoConstructor(value: unknown): value is ZodDtoConstructor {
  return typeof value === "function" && "schema" in value && value.schema instanceof ZodType;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform<unknown, unknown> {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    if (!isZodDtoConstructor(metadata.metatype)) return value;

    const parsed = metadata.metatype.schema.safeParse(value);
    if (!parsed.success) {
      throw new BadRequestException({
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        details: z.flattenError(parsed.error),
      });
    }
    return parsed.data;
  }
}

export class ZodValuePipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    const parsed = this.schema.safeParse(value);
    if (!parsed.success) {
      throw new BadRequestException({
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        details: z.flattenError(parsed.error),
      });
    }
    return parsed.data;
  }
}
