import { describe, expect } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, date, number, boolean } from 'zod';
import { setupCompletePrefabComponent } from './generic-test-functions/setup-prefab-component';
import { find } from '@ember/test-helpers';
import { setupTest } from '../../../test-helper';

describe('Integration | Component | tpk-attributes', () => {
  const prefabs = [
    'input',
    'bic',
    'iban',
    'email',
    'mobile',
    'datepicker',
    'timepicker',
    'currency',
    'integer',
    'number',
    'password',
    'radio-group',
    'radio',
    'select',
    'select-create',
    'select-search',
    'checkbox',
    'file',
  ];

  const validationSchema = object({
    input: string(),
    bic: string(),
    iban: string(),
    email: string(),
    mobile: string(),
    datepicker: date(),
    timepicker: date(),
    currency: number(),
    integer: number(),
    number: number(),
    password: string(),
    radiogroup: string(),
    radio: string(),
    select: string(),
    selectcreate: string(),
    selectsearch: string(),
    checkbox: boolean(),
    file: string(),
  });

  const baseChangeset = new ImmerChangeset({
    input: '',
    bic: '',
    iban: '',
    email: '',
    mobile: '',
    datepicker: null,
    timepicker: null,
    currency: 0,
    integer: 0,
    number: 0,
    password: '',
    radiogroup: '',
    radio: '',
    select: '',
    selectcreate: '',
    selectsearch: '',
    checkbox: false,
    file: '',
  });

  for (const prefab of prefabs) {
    renderingTest(
      `Attributes should be passed to the container for ${prefab}`,
      async ({ env }) => {
        setupTest(env.owner);
        setupTest(env.owner);

        await setupCompletePrefabComponent({
          changeset: baseChangeset,
          validationSchema,
        });
        expect(
          find(
            `[data-test-tpk-prefab-${prefab}-container]`,
          )?.classList.contains('custom-class'),
        ).toBe(true);
      },
    );
  }
});
