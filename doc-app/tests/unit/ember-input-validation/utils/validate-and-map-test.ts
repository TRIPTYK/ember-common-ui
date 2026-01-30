import { module, test } from 'qunit';
import {
  deepPickByPath,
  validateAndMapErrors,
  validateOneAndMapErrors,
  jsonPathToDottedPath,
  dottedPathToJsonPath,
} from '@triptyk/ember-input-validation/utils/validate-and-map';
import { setupTest } from 'ember-qunit';
import { z } from 'zod';

module('Unit | Utils | validate-and-map', function (hooks) {
  setupTest(hooks);

  module('deepPickByPath', function () {
    test('it extracts a top-level string property schema', function (assert) {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const result = deepPickByPath(schema, 'name');

      // Validate that we get the correct schema by testing it
      assert.strictEqual(result.parse('John'), 'John');
      assert.throws(() => result.parse(123));
    });

    test('it extracts a nested string property schema', function (assert) {
      const schema = z.object({
        user: z.object({
          name: z.string(),
          age: z.number(),
        }),
      });

      const result = deepPickByPath(schema, 'user.name');

      // Should accept strings
      assert.strictEqual(result.parse('Jane'), 'Jane');
      // Should reject numbers
      assert.throws(() => result.parse(123));
    });

    test('it extracts a deeply nested property schema', function (assert) {
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

      assert.strictEqual(result.parse('Alice'), 'Alice');
      assert.throws(() => result.parse(456));
    });

    test('it extracts a number property schema', function (assert) {
      const schema = z.object({
        user: z.object({
          age: z.number(),
        }),
      });

      const result = deepPickByPath(schema, 'user.age');

      assert.strictEqual(result.parse(25), 25);
      assert.throws(() => result.parse('25'));
    });

    test('it extracts an object property schema', function (assert) {
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
      assert.deepEqual(result.parse(validData), validData);
      assert.throws(() => result.parse('not an object'));
    });

    test('it extracts an array property schema', function (assert) {
      const schema = z.object({
        users: z.array(z.string()),
      });

      const result = deepPickByPath(schema, 'users');

      const validData = ['Alice', 'Bob'];
      assert.deepEqual(result.parse(validData), validData);
      assert.throws(() => result.parse('not an array'));
    });

    test('it throws when path does not exist in schema', function (assert) {
      const schema = z.object({
        name: z.string(),
      });

      assert.throws(
        () => deepPickByPath(schema, 'nonexistent'),
        /Key "nonexistent" not found in schema/
      );
    });

    test('it throws when trying to traverse a non-object schema', function (assert) {
      const schema = z.object({
        name: z.string(),
      });

      assert.throws(
        () => deepPickByPath(schema, 'name.something'),
        /"something" is not an object/
      );
    });

    test('it throws when path has a missing key in nested object', function (assert) {
      const schema = z.object({
        user: z.object({
          name: z.string(),
        }),
      });

      assert.throws(
        () => deepPickByPath(schema, 'user.age'),
        /Key "age" not found in schema/
      );
    });

    test('it works with optional fields', function (assert) {
      const schema = z.object({
        user: z.object({
          name: z.string().optional(),
        }),
      });

      const result = deepPickByPath(schema, 'user.name');

      assert.strictEqual(result.parse('John'), 'John');
      assert.strictEqual(result.parse(undefined), undefined);
    });
  });

  module('validateAndMapErrors', function () {
    test('it returns empty array for valid data', async function (assert) {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const errors = await validateAndMapErrors(schema, {
        name: 'John',
        age: 25,
      });

      assert.deepEqual(errors, []);
    });

    test('it returns validation errors for invalid data', async function (assert) {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const errors = await validateAndMapErrors(schema, {
        name: 'John',
        age: 'not a number',
      });

      assert.strictEqual(errors.length, 1);
      assert.strictEqual(errors[0]?.key, 'age');
      assert.ok(errors[0]?.message);
    });

    test('it returns multiple validation errors', async function (assert) {
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

      assert.strictEqual(errors.length, 3);
      const keys = errors.map((e) => e.key);
      assert.ok(keys.includes('name'));
      assert.ok(keys.includes('age'));
      assert.ok(keys.includes('email'));
    });

    test('it handles nested validation errors', async function (assert) {
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

      assert.strictEqual(errors.length, 1);
      assert.strictEqual(errors[0]?.key, 'user.age');
    });
  });

  module('validateOneAndMapErrors', function () {
    test('it returns empty array when single field is valid', async function (assert) {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const errors = await validateOneAndMapErrors('name', schema, {
        name: 'John',
        age: 25,
      });

      assert.deepEqual(errors, []);
    });

    test('it returns validation error when single field is invalid', async function (assert) {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const errors = await validateOneAndMapErrors('age', schema, {
        name: 'John',
        age: 'invalid',
      });

      assert.strictEqual(errors.length, 1);
      assert.strictEqual(errors[0]?.key, 'age');
    });

    test('it validates nested field correctly', async function (assert) {
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

      assert.deepEqual(errors, []);
    });

    test('it returns error for invalid nested field', async function (assert) {
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

      assert.strictEqual(errors.length, 1);
      assert.strictEqual(errors[0]?.key, 'user.age');
    });

    test('it handles deeply nested paths', async function (assert) {
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
        }
      );

      assert.strictEqual(errors.length, 1);
      assert.strictEqual(errors[0]?.key, 'company.department.employee.name');
    });
  });

  module('jsonPathToDottedPath', function () {
    test('it converts simple array notation to dot notation', function (assert) {
      assert.strictEqual(jsonPathToDottedPath('users[0]'), 'users.0');
    });

    test('it converts nested array notation', function (assert) {
      assert.strictEqual(
        jsonPathToDottedPath('users[0].addresses[1]'),
        'users.0.addresses.1'
      );
    });

    test('it removes quotes', function (assert) {
      assert.strictEqual(jsonPathToDottedPath('"users"[0]'), 'users.0');
    });

    test('it handles paths without arrays', function (assert) {
      assert.strictEqual(jsonPathToDottedPath('user.name'), 'user.name');
    });

    test('it handles complex nested paths', function (assert) {
      assert.strictEqual(
        jsonPathToDottedPath('company.departments[5].employees[10].name'),
        'company.departments.5.employees.10.name'
      );
    });
  });

  module('dottedPathToJsonPath', function () {
    test('it converts dot notation to array notation', function (assert) {
      assert.strictEqual(dottedPathToJsonPath('users.0'), 'users[0]');
    });

    test('it converts nested dot notation', function (assert) {
      assert.strictEqual(
        dottedPathToJsonPath('users.0.addresses.1'),
        'users[0].addresses[1]'
      );
    });

    test('it removes quotes', function (assert) {
      assert.strictEqual(dottedPathToJsonPath('"users".0'), 'users[0]');
    });

    test('it handles paths without numeric indices', function (assert) {
      assert.strictEqual(dottedPathToJsonPath('user.name'), 'user.name');
    });

    test('it handles complex nested paths', function (assert) {
      assert.strictEqual(
        dottedPathToJsonPath('company.departments.5.employees.10.name'),
        'company.departments[5].employees[10].name'
      );
    });
  });
});
