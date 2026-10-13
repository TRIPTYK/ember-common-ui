import { ZodError, ZodObject } from 'zod';
import 'ember-immer-changeset';
import { get } from '@ember/object';
import { assert } from '@ember/debug';

function deepPickByPath(schema, path) {
  const keys = path.split('.');
  function pick(current, remaining) {
    if (remaining.length === 0) {
      return current;
    }
    if (!(current instanceof ZodObject)) {
      throw new Error(`"${remaining[0]}" is not an object`);
    }
    const [key, ...rest] = remaining;
    const shape = current.shape;
    assert('key is defined', key);
    if (!(key in shape)) {
      throw new Error(`Key "${key}" not found in schema`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return pick(shape[key], rest);
  }
  return pick(schema, keys);
}
async function validateAndMapErrors(schema, dto) {
  try {
    await schema.parseAsync(dto);
    return [];
  } catch (e) {
    return applyErrors('', e);
  }
}
async function validateOneAndMapErrors(path, schema, dto) {
  try {
    const propSchema = deepPickByPath(schema, path);
    await propSchema.parseAsync(get(dto, path));
    return [];
  } catch (e) {
    if (!(e instanceof ZodError)) console.warn('Non-ValidationError caught in validateOneAndMapErrors', e);
    return applyErrors(path, e);
  }
}
function applyErrors(prefix = '', e) {
  if (e instanceof ZodError) {
    const errs = e.issues.reduce((mergedErrors, e) => {
      const errorPath = e.path.join('.');
      const pathWithPrefix = prefix && errorPath ? `${prefix}.${errorPath}` : prefix || errorPath;
      const path = jsonPathToDottedPath(pathWithPrefix);
      mergedErrors.push({
        message: e.message,
        params: e.code ? {
          code: e.code
        } : undefined,
        key: path,
        value: e.input,
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

export { deepPickByPath, dottedPathToJsonPath, jsonPathToDottedPath, validateAndMapErrors, validateOneAndMapErrors };
//# sourceMappingURL=validate-and-map.js.map
