import { object, ZodError, ZodObject, type ZodType } from 'zod';
import { type ValidationError as ChangesetValidationError } from 'ember-immer-changeset';
import { get } from '@ember/object';
import { assert } from '@ember/debug';

export function deepPickByPath<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ZodObject<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>(schema: T, path: string): ZodObject<any> {
  const keys = path.split('.');

  function pick(
    current: ZodType<unknown, unknown>,
    remaining: string[],
  ): ZodType<unknown, unknown> {
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

    return object({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      [key]: pick(shape[key], rest),
    });
  }

  const result = pick(schema, keys);

  if (!(result instanceof ZodObject)) {
    throw new Error('Result is not an object');
  }

  return result;
}

export async function validateAndMapErrors<T extends ZodObject>(
  schema: T,
  dto: unknown,
): Promise<ChangesetValidationError[]> {
  try {
    await schema.parseAsync(dto);
    return [];
  } catch (e) {
    return applyErrors('', e);
  }
}

export async function validateOneAndMapErrors<T extends ZodObject>(
  path: string,
  schema: T,
  dto: unknown,
): Promise<ChangesetValidationError[]> {
  try {
    const propSchema = deepPickByPath(schema, path);
    console.log(path);

    await propSchema.parseAsync(get(dto, path));
    return [];
  } catch (e) {
    const prefix = path.split('.');

    if (prefix.length === 1) {
      return applyErrors(path, e);
    }

    return applyErrors(prefix.slice(0, -1).join('.'), e);
  }
}

function applyErrors(prefix: string = '', e: unknown) {
  if (e instanceof ZodError) {
    const errs = e.issues.reduce((mergedErrors, e) => {
      const pathWithPrefix = prefix
        ? prefix + e.path.join('.')
        : e.path.join('.');
      const path = jsonPathToDottedPath(pathWithPrefix);
      mergedErrors.push({
        message: e.message,
        params: e.code ? { code: e.code } : undefined,
        key: path,
        value: e.input,
        originalValue: '',
      });
      return mergedErrors;
    }, [] as ChangesetValidationError[]);
    return errs;
  }
  return [];
}

export function jsonPathToDottedPath(e: string) {
  return e.replaceAll('"', '').replace(/(\w+)\[(\d+)\]/g, '$1.$2');
}

export function dottedPathToJsonPath(e: string) {
  return e.replaceAll('"', '').replace(/(\w+)\.(\d+)/g, '$1[$2]');
}
