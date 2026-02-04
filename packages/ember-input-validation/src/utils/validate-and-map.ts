import { ZodError, ZodObject, type ZodType } from 'zod';
import { type ValidationError as ChangesetValidationError } from 'ember-immer-changeset';
import { get } from '@ember/object';
import { assert } from '@ember/debug';

export function deepPickByPath<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ZodObject<any>,
>(schema: T, path: string): ZodType<unknown, unknown> {
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return pick(shape[key], rest);
  }

  return pick(schema, keys);
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
    await propSchema.parseAsync(get(dto, path));
    return [];
  } catch (e) {
    if (!(e instanceof ZodError))
      console.warn('Non-ValidationError caught in validateOneAndMapErrors', e);

    return applyErrors(path, e);
  }
}

function applyErrors(prefix: string = '', e: unknown) {
  if (e instanceof ZodError) {
    const errs = e.issues.reduce((mergedErrors, e) => {
      const errorPath = e.path.join('.');
      const pathWithPrefix =
        prefix && errorPath ? `${prefix}.${errorPath}` : prefix || errorPath;
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
