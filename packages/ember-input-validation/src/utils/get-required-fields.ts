import { ZodError, ZodObject } from 'zod';
import { clearObjectValues } from './clear-object.ts';
import { jsonPathToDottedPath } from './validate-and-map.ts';

export function getRequiredFields(
  validationSchema: ZodObject,
  data: Record<string, unknown>,
): string[] | undefined {
  const clearedObject = clearObjectValues(data);

  try {
    validationSchema.parse(clearedObject);
  } catch (e) {
    if (e instanceof ZodError) {
      const errorFields = e.issues.map((err) => ({
        type: err.code,
        path: err.path.join('.'),
        message: err.message,
        value: err.input,
      }));

      const a = errorFields
        .map((error) => jsonPathToDottedPath(error.path))
        .filter((r) => r !== undefined);
      return a;
    }
  }
}
