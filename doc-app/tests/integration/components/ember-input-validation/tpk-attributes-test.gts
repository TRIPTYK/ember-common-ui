import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, date, number, boolean } from 'yup';
import { setupCompletePrefabComponent } from './generic-test-functions/setup-prefab-component';

module('Integration | Component | tpk-attributes', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');
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

  for (const prefab of prefabs) {
    test(`Attributes should be passed to the container for ${prefab}`, async function (assert) {
      await setupCompletePrefabComponent({
        changeset: baseChangeset,
        validationSchema,
      });
      assert.dom(`[data-test-tpk-prefab-${prefab}-container]`).hasClass('custom-class');
    });
  }
});
