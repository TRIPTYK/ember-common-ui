import { ValidationError, type Schema } from "yup";
import { clearObjectValues } from "./clear-object.ts";
import { jsonPathToDottedPath } from "./validate-and-map.ts";

export function getRequiredFields(validationSchema: Schema, data: Record<string, unknown>): string[] | undefined {
  const clearedObject = clearObjectValues(data);
  try {
    validationSchema.validateSync(clearedObject, { abortEarly: false });
  } catch(e) {
    if (e instanceof ValidationError) {
      const errorFields = e.inner.map((err) => ({
        type: err.type,
        path: err.path,
        message: err.message,
        value: err.value,
      }));
      return errorFields
        .filter((e) => e.type === 'required')
        .map((error) => jsonPathToDottedPath(error.path ?? ''))
        .filter(r => r !== undefined);
    }
  }
}
