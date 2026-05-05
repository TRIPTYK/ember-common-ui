import { describe, expect, vi } from 'vitest';
import { renderingTest } from 'ember-vitest';
import { timeout } from 'ember-concurrency';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, date, number, boolean, email } from 'zod';
import { setupTest } from '../../../test-helper';
import {
  setupCompletePrefabComponent,
  setupComponent,
} from './generic-test-functions/setup-prefab-component.gts';

describe('Integration | Component | tpk-form-error-scroll', () => {
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
    'radiogroup',
    'radio',
    'select',
    'selectcreate',
    'selectsearch',
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
      `when autoScrollOnError is true, it scrolls the page to the error for ${prefab}`,
      async ({ env }) => {
        setupTest(env.owner);
        setupTest(env.owner);

        const scrollToSpy = vi.fn();
        const originalScrollTo = window.scrollTo;
        window.scrollTo = scrollToSpy;

        try {
          const changeset = await setupCompletePrefabComponent({
            changeset: baseChangeset,
            validationSchema,
            autoScrollOnError: true,
          });

          changeset.addError({
            message: 'required',
            value: false,
            originalValue: true,
            key: prefab,
          });

          await timeout(50);
          expect(scrollToSpy).toHaveBeenCalledOnce();
          changeset.removeError(prefab);
        } finally {
          window.scrollTo = originalScrollTo;
        }
      },
    );
  }

  renderingTest(
    'when autoScrollOnError is false, it does not scrolls the page to the first error',
    async ({ env }) => {
      setupTest(env.owner);

      const scrollToSpy = vi.fn();
      const originalScrollTo = window.scrollTo;
      window.scrollTo = scrollToSpy;

      try {
        const changeset = await setupComponent({
          validationSchema: object({
            email: email(),
          }),
          changeset: new ImmerChangeset({
            email: '',
            name: '',
          }),
          autoScrollOnError: false,
        });

        changeset.addError({
          message: 'required',
          value: false,
          originalValue: true,
          key: 'email',
        });

        await timeout(50);
        expect(scrollToSpy).not.toHaveBeenCalled();
      } finally {
        window.scrollTo = originalScrollTo;
      }
    },
  );
});
