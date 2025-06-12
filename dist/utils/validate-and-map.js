import { ValidationError } from 'yup';
import 'ember-immer-changeset';

async function validateAndMapErrors(schema, dto) {
  try {
    await schema.validate(dto, {
      abortEarly: false
    });
    return [];
  } catch (e) {
    return applyErrors(e);
  }
}
async function validateOneAndMapErrors(path, schema, dto) {
  try {
    await schema.validateAt(dottedPathToJsonPath(path), dto, {
      abortEarly: false,
      recursive: false
    });
    return [];
  } catch (e) {
    return applyErrors(e);
  }
}
function applyErrors(e) {
  if (e instanceof ValidationError) {
    const errs = e.inner.reduce((mergedErrors, e) => {
      const path = jsonPathToDottedPath(e.path ?? '');
      mergedErrors.push({
        message: e.message,
        params: e.params,
        key: path,
        value: e.value,
        originalValue: ''
      });
      return mergedErrors;
    }, []);
    return errs;
  }
  return [];
}
function jsonPathToDottedPath(e) {
  return e.replaceAll('"', '').replace(/(\w+)\[(\d+)\]/g, '$1.$2');
}
function dottedPathToJsonPath(e) {
  return e.replaceAll('"', '').replace(/(\w+)\.(\d+)/g, '$1[$2]');
}

export { dottedPathToJsonPath, jsonPathToDottedPath, validateAndMapErrors, validateOneAndMapErrors };
//# sourceMappingURL=validate-and-map.js.map
