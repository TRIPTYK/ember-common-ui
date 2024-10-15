import { module, test } from 'qunit';
import { clearObjectValues } from '@triptyk/ember-input-validation/utils/clear-object';
import { setupTest } from 'ember-qunit';

module('Unit | Utils | clear-object', function (hooks) {
  setupTest(hooks);

  test('Should clear values of simple object', async function (assert) {
    const objToClear = {
      name: 'Romain',
      age: 25,
      hobbies: ['coding', 'reading', 'walking'],
      isDeveloper: true,
    };
    assert.deepEqual(clearObjectValues(objToClear), {
      name: '',
      age: '',
      hobbies: [],
      isDeveloper: false,
    });
  });

  test('Should clear values of complex object', async function (assert) {
    const objToClear = {
      name: 'Amaury',
      age: 28,
      isDeveloper: true,
      hobbies: [
        {
          name: 'coding',
          level: 'high',
        },
        {
          name: 'reading',
          level: 'medium',
        },
        {
          name: 'walking',
          level: 'low',
        },
      ],
      address: {
        street: 'rue de la paix',
        city: 'Jemappes',
        neighborhood: [
          {
            town: 'Mons',
            zipCode: '7000',
            neighborhood: 'Jemappes',
          },
          {
            town: 'Quevy',
            zipCode: '7012',
            neighborhood: 'Jemappes',
          },
        ],
      },
    };
    assert.deepEqual(clearObjectValues(objToClear), {
      name: '',
      age: '',
      isDeveloper: false,
      hobbies: [
        {
          name: '',
          level: '',
        },
        {
          name: '',
          level: '',
        },
        {
          name: '',
          level: '',
        },
      ],
      address: {
        street: '',
        city: '',
        neighborhood: [
          {
            town: '',
            zipCode: '',
            neighborhood: '',
          },
          {
            town: '',
            zipCode: '',
            neighborhood: '',
          },
        ],
      },
    });
  });
  test('Should clear values of deepest object', async function (assert) {
    const objToClear = {
      key_1: 'value_1',
      key_2: {
        key_2_1: 'value_2_1',
        key_2_2: {
          key_2_2_1: 'value_2_2_1',
          key_2_2_2: {
            key_2_2_2_1: 'value_2_2_2_1',
            key_2_2_2_2: {
              key_2_2_2_2_1: 'value_2_2_2_2_1',
            },
          },
        },
      },
    };
    assert.deepEqual(clearObjectValues(objToClear), {
      key_1: '',
      key_2: {
        key_2_1: '',
        key_2_2: {
          key_2_2_1: '',
          key_2_2_2: {
            key_2_2_2_1: '',
            key_2_2_2_2: {
              key_2_2_2_2_1: '',
            },
          },
        },
      },
    });
  });
});
