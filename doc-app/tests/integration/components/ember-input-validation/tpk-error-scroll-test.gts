import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import { timeout } from 'ember-concurrency';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, date, number, boolean } from 'yup';
import { setupCompletePrefabComponent, setupComponent } from './generic-test-functions/setup-prefab-component';

module('Integration | Component | tpk-form-error-scroll', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');

  let originalScrollTo: () => void;
  let callCount = 0;
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

  const validationSchema = object().shape({
    input: string().required(),
    bic: string().required(),
    iban: string().required(),
    email: string().required(),
    mobile: string().required(),
    datepicker: date().required(),
    timepicker: date().required(),
    currency: number().required(),
    integer: number().required(),
    number: number().required(),
    password: string().required(),
    radiogroup: string().required(),
    radio: string().required(),
    select: string().required(),
    selectcreate: string().required(),
    selectsearch: string().required(),
    checkbox: boolean().required(),
    file: string().required(),
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

  hooks.beforeEach(function () {
    originalScrollTo = window.scrollTo;
    window.scrollTo = () => {
      callCount++;
    };
  });

  hooks.afterEach(function () {
    window.scrollTo = originalScrollTo;
    callCount = 0;
  });

  for (const prefab of prefabs) {
    test(`when autoScrollOnError is true, it scrolls the page to the error for ${prefab}`, async function (assert) {
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
      assert.strictEqual(callCount, 1);
      changeset.removeError(prefab);
    });
  }

  test('when autoScrollOnError is false, it does not scrolls the page to the first error', async function (assert) {
    const changeset = await setupComponent({
      validationSchema: object().shape({
        email: string().email().required(),
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
    assert.strictEqual(callCount, 0);
  });
});
