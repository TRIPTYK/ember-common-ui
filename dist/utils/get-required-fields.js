import { ZodError } from 'zod';
import { clearObjectValues } from './clear-object.js';
import { jsonPathToDottedPath } from './validate-and-map.js';

function getRequiredFields(validationSchema, data) {
  const clearedObject = clearObjectValues(data);
  try {
    validationSchema.parse(clearedObject);
  } catch (e) {
    if (e instanceof ZodError) {
      const errorFields = e.issues.map(err => ({
        type: err.code,
        path: err.path.join('.'),
        message: err.message,
        value: err.input
      }));
      const a = errorFields.map(error => jsonPathToDottedPath(error.path)).filter(r => r !== undefined);
      return a;
    }
  }
}

export { getRequiredFields };
//# sourceMappingURL=get-required-fields.js.map
