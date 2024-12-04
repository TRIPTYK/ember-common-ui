import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import { timeout } from 'ember-concurrency';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string, date, number, boolean, Schema } from 'yup';
import { initializeParams, type TpkFormParams } from './generic-test-functions/initialize-params-tpk-form';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';
import { render } from '@ember/test-helpers';

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

  async function setupComponent(params?: TpkFormParams) {
    const { changeset, onSubmit, validationSchema, reactive, removeErrorsOnSubmit, autoScrollOnError, executeOnValid } = initializeParams(params);

    await render(
      <template>
      <TpkForm
          @changeset={{changeset}}
          @validationSchema={{validationSchema}}
          @onSubmit={{onSubmit}}
          @reactive={{reactive}}
          @autoScrollOnError={{autoScrollOnError}}
          @removeErrorsOnSubmit={{removeErrorsOnSubmit}}
          @executeOnValid={{executeOnValid}}
        as |F|>
          <F.TpkInputPrefab @label="test" @validationField="name" />
          <F.TpkInput @label="test" @type="email" @validationField="email" as |I|>
            <I.Label />
            <I.Input anchorScrollUp="email" />
          </F.TpkInput>
          <button type="submit">Submit</button>
        </TpkForm>
      </template>
    );

    return changeset;
  }

  async function setupCompletePrefabComponent(params?: TpkFormParams) {
    const { changeset, onSubmit, validationSchema, reactive, removeErrorsOnSubmit, autoScrollOnError, executeOnValid } = initializeParams(params);
    const selectOptions = ['option1', 'option2'];
    const onCreate = () => {};
    const onSearch = () => {};
    await render(
      <template>
      <TpkForm
          @changeset={{changeset}}
          @validationSchema={{validationSchema}}
          @onSubmit={{onSubmit}}
          @reactive={{reactive}}
          @autoScrollOnError={{autoScrollOnError}}
          @removeErrorsOnSubmit={{removeErrorsOnSubmit}}
          @executeOnValid={{executeOnValid}}
        as |F|>
          <F.TpkInputPrefab @label="test" @validationField="input" />
          <F.TpkBicPrefab @label="test" @validationField="bic" />
          <F.TpkIbanPrefab @label="test" @validationField="iban" />
          <F.TpkEmailPrefab @label="test" @validationField="email" />
          <F.TpkMobilePrefab @label="test" @validationField="mobile" />
          <F.TpkDatepickerPrefab @label="test" @validationField="datepicker" />
          <F.TpkTimepickerPrefab @label="test" @validationField="timepicker" />
          <F.TpkCurrencyPrefab @label="test" @validationField="currency" />
          <F.TpkIntegerPrefab @label="test" @validationField="integer" />
          <F.TpkNumberPrefab @label="test" @validationField="number" />
          <F.TpkPasswordPrefab @label="test" @validationField="password" />
          <F.TpkRadioGroupPrefab @label="test" @validationField="radiogroup" as |Radio|>
            <Radio @value="radio1" @label="Radio 1" />
            <Radio @value="radio2" @label="Radio 2" />
          </F.TpkRadioGroupPrefab>
          <F.TpkRadioPrefab @label="test" @validationField="radio" @value="radio" />
          <F.TpkSelectPrefab @label="test" @validationField="select" @options={{selectOptions}} />
          <F.TpkSelectCreatePrefab @label="test" @validationField="selectcreate" @options={{selectOptions}} @onCreate={{onCreate}} />
          <F.TpkSelectSearchPrefab @label="test" @validationField="selectsearch" @options={{selectOptions}} @onSearch={{onSearch}} />
          <F.TpkCheckboxPrefab @label="test" @validationField="checkbox" />
          <F.TpkFilePrefab @label="test" @validationField="file" />
          <button type="submit">Submit</button>
        </TpkForm>
      </template>
    );

    return changeset;
  }

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
