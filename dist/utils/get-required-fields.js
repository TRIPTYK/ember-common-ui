import { ValidationError } from 'yup';
import { clearObjectValues } from './clear-object.js';
import { jsonPathToDottedPath } from './validate-and-map.js';

function getRequiredFields(validationSchema, data) {
  const clearedObject = clearObjectValues(data);
  try {
    validationSchema.validateSync(clearedObject, {
      abortEarly: false
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      const errorFields = e.inner.map(err => ({
        type: err.type,
        path: err.path,
        message: err.message,
        value: err.value
      }));
      return errorFields.filter(e => e.type === 'required').map(error => jsonPathToDottedPath(error.path ?? '')).filter(r => r !== undefined);
    }
  }
}

export { getRequiredFields };
//# sourceMappingURL=get-required-fields.js.map
