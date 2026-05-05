import { describe, test, expect } from 'vitest';
import {
  deepPickByPath,
  validateAndMapErrors,
  validateOneAndMapErrors,
  jsonPathToDottedPath,
  dottedPathToJsonPath,
} from '@triptyk/ember-input-validation/utils/validate-and-map';
import { z } from 'zod';

describe('Unit | Utils | validate-and-map', () => {
  describe('deepPickByPath', () => {
    test('it extracts a top-level string property schema', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const result = deepPickByPath(schema, 'name');

      expect(result.parse('John')).toBe('John');
      expect(() => result.parse(123)).toThrow();
    });

    test('it extracts a nested string property schema', () => {
      const schema = z.object({
        user: z.object({
          name: z.string(),
          age: z.number(),
        }),
      });

      const result = deepPickByPath(schema, 'user.name');

      expect(result.parse('Jane')).toBe('Jane');
      expect(() => result.parse(123)).toThrow();
    });

    test('it extracts a deeply nested property schema', () => {
      const schema = z.object({
        company: z.object({
          department: z.object({
            employee: z.object({
              name: z.string(),
              id: z.number(),
            }),
          }),
        }),
      });

      const result = deepPickByPath(schema, 'company.department.employee.name');

      expect(result.parse('Alice')).toBe('Alice');
      expect(() => result.parse(456)).toThrow();
    });

    test('it extracts a number property schema', () => {
      const schema = z.object({
        user: z.object({
          age: z.number(),
        }),
      });

      const result = deepPickByPath(schema, 'user.age');

      expect(result.parse(25)).toBe(25);
      expect(() => result.parse('25')).toThrow();
    });

    test('it extracts an object property schema', () => {
      const schema = z.object({
        user: z.object({
          profile: z.object({
            firstName: z.string(),
            lastName: z.string(),
          }),
        }),
      });

      const result = deepPickByPath(schema, 'user.profile');

      const validData = { firstName: 'John', lastName: 'Doe' };
      expect(result.parse(validData)).toEqual(validData);
      expect(() => result.parse('not an object')).toThrow();
    });

    test('it extracts an array property schema', () => {
      const schema = z.object({
        users: z.array(z.string()),
      });

      const result = deepPickByPath(schema, 'users');

      const validData = ['Alice', 'Bob'];
      expect(result.parse(validData)).toEqual(validData);
      expect(() => result.parse('not an array')).toThrow();
    });

    test('it throws when path does not exist in schema', () => {
      const schema = z.object({
        name: z.string(),
      });

      expect(() => deepPickByPath(schema, 'nonexistent')).toThrow(
        /Key "nonexistent" not found in schema/,
      );
    });

    test('it throws when trying to traverse a non-object schema', () => {
      const schema = z.object({
        name: z.string(),
      });

      expect(() => deepPickByPath(schema, 'name.something')).toThrow(
        /"something" is not an object/,
      );
    });

    test('it throws when path has a missing key in nested object', () => {
      const schema = z.object({
        user: z.object({
          name: z.string(),
        }),
      });

      expect(() => deepPickByPath(schema, 'user.age')).toThrow(
        /Key "age" not found in schema/,
      );
    });

    test('it works with optional fields', () => {
      const schema = z.object({
        user: z.object({
          name: z.string().optional(),
        }),
      });

      const result = deepPickByPath(schema, 'user.name');

      expect(result.parse('John')).toBe('John');
      expect(result.parse(undefined)).toBe(undefined);
    });
  });

  describe('validateAndMapErrors', () => {
    test('it returns empty array for valid data', async () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const errors = await validateAndMapErrors(schema, {
        name: 'John',
        age: 25,
      });

      expect(errors).toEqual([]);
    });

    test('it returns validation errors for invalid data', async () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const errors = await validateAndMapErrors(schema, {
        name: 'John',
        age: 'not a number',
      });

      expect(errors.length).toBe(1);
      expect(errors[0]?.key).toBe('age');
      expect(errors[0]?.message).toBeTruthy();
    });

    test('it returns multiple validation errors', async () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
      });

      const errors = await validateAndMapErrors(schema, {
        name: 123,
        age: 'not a number',
        email: 'invalid-email',
      });

      expect(errors.length).toBe(3);
      const keys = errors.map((e) => e.key);
      expect(keys).toContain('name');
      expect(keys).toContain('age');
      expect(keys).toContain('email');
    });

    test('it handles nested validation errors', async () => {
      const schema = z.object({
        user: z.object({
          name: z.string(),
          age: z.number(),
        }),
      });

      const errors = await validateAndMapErrors(schema, {
        user: {
          name: 'John',
          age: 'invalid',
        },
      });

      expect(errors.length).toBe(1);
      expect(errors[0]?.key).toBe('user.age');
    });
  });

  describe('validateOneAndMapErrors', () => {
    test('it returns empty array when single field is valid', async () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const errors = await validateOneAndMapErrors('name', schema, {
        name: 'John',
        age: 25,
      });

      expect(errors).toEqual([]);
    });

    test('it returns validation error when single field is invalid', async () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const errors = await validateOneAndMapErrors('age', schema, {
        name: 'John',
        age: 'invalid',
      });

      expect(errors.length).toBe(1);
      expect(errors[0]?.key).toBe('age');
    });

    test('it validates nested field correctly', async () => {
      const schema = z.object({
        user: z.object({
          name: z.string(),
          age: z.number(),
        }),
      });

      const errors = await validateOneAndMapErrors('user.name', schema, {
        user: {
          name: 'Alice',
          age: 30,
        },
      });

      expect(errors).toEqual([]);
    });

    test('it returns error for invalid nested field', async () => {
      const schema = z.object({
        user: z.object({
          name: z.string(),
          age: z.number(),
        }),
      });

      const errors = await validateOneAndMapErrors('user.age', schema, {
        user: {
          name: 'Alice',
          age: 'invalid',
        },
      });

      expect(errors.length).toBe(1);
      expect(errors[0]?.key).toBe('user.age');
    });

    test('it handles deeply nested paths', async () => {
      const schema = z.object({
        company: z.object({
          department: z.object({
            employee: z.object({
              name: z.string(),
            }),
          }),
        }),
      });

      const errors = await validateOneAndMapErrors(
        'company.department.employee.name',
        schema,
        {
          company: {
            department: {
              employee: {
                name: 123,
              },
            },
          },
        },
      );

      expect(errors.length).toBe(1);
      expect(errors[0]?.key).toBe('company.department.employee.name');
    });
  });

  describe('jsonPathToDottedPath', () => {
    test('it converts simple array notation to dot notation', () => {
      expect(jsonPathToDottedPath('users[0]')).toBe('users.0');
    });

    test('it converts nested array notation', () => {
      expect(jsonPathToDottedPath('users[0].addresses[1]')).toBe(
        'users.0.addresses.1',
      );
    });

    test('it removes quotes', () => {
      expect(jsonPathToDottedPath('"users"[0]')).toBe('users.0');
    });

    test('it handles paths without arrays', () => {
      expect(jsonPathToDottedPath('user.name')).toBe('user.name');
    });

    test('it handles complex nested paths', () => {
      expect(
        jsonPathToDottedPath('company.departments[5].employees[10].name'),
      ).toBe('company.departments.5.employees.10.name');
    });
  });

  describe('dottedPathToJsonPath', () => {
    test('it converts dot notation to array notation', () => {
      expect(dottedPathToJsonPath('users.0')).toBe('users[0]');
    });

    test('it converts nested dot notation', () => {
      expect(dottedPathToJsonPath('users.0.addresses.1')).toBe(
        'users[0].addresses[1]',
      );
    });

    test('it removes quotes', () => {
      expect(dottedPathToJsonPath('"users".0')).toBe('users[0]');
    });

    test('it handles paths without numeric indices', () => {
      expect(dottedPathToJsonPath('user.name')).toBe('user.name');
    });

    test('it handles complex nested paths', () => {
      expect(
        dottedPathToJsonPath('company.departments.5.employees.10.name'),
      ).toBe('company.departments[5].employees[10].name');
    });
  });
});
