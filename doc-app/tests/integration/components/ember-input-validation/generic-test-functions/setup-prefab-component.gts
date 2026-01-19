import { render } from "@ember/test-helpers";
import { initializeParams, type TpkFormParams } from './initialize-params-tpk-form';
import TpkForm from '@triptyk/ember-input-validation/components/tpk-form';

export async function setupCompletePrefabComponent(params?: TpkFormParams) {
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
        <F.TpkInputPrefab @label="test" @validationField="input" class="custom-class"/>
        <F.TpkBicPrefab @label="test" @validationField="bic" class="custom-class"/>
        <F.TpkIbanPrefab @label="test" @validationField="iban" class="custom-class"/>
        <F.TpkEmailPrefab @label="test" @validationField="email" class="custom-class"/>
        <F.TpkMobilePrefab @label="test" @validationField="mobile" class="custom-class"/>
        <F.TpkDatepickerPrefab @label="test" @validationField="datepicker" class="custom-class"/>
        <F.TpkTimepickerPrefab @label="test" @validationField="timepicker" class="custom-class"/>
        <F.TpkCurrencyPrefab @label="currency" @validationField="currency" class="custom-class"/>
        <F.TpkIntegerPrefab @label="test" @validationField="integer" class="custom-class"/>
        <F.TpkNumberPrefab @label="test" @validationField="number" class="custom-class"/>
        <F.TpkPasswordPrefab @label="test" @validationField="password" class="custom-class"/>
        <F.TpkRadioPrefab @label="test" @validationField="radio" @value="radio" class="custom-class" />
        <F.TpkRadioGroupPrefab @label="test" @validationField="radiogroup" class="custom-class" as |Radio|>
          <Radio @value="radio1" @label="Radio 1" />
          <Radio @value="radio2" @label="Radio 2" />
        </F.TpkRadioGroupPrefab>
        <F.TpkSelectPrefab @label="test" @validationField="select" @options={{selectOptions}} class="custom-class" />
        <F.TpkSelectCreatePrefab @label="test" @validationField="selectcreate" @options={{selectOptions}} @onCreate={{onCreate}} class="custom-class" />
        <F.TpkSelectSearchPrefab @label="test" @validationField="selectsearch" @options={{selectOptions}} @onSearch={{onSearch}} class="custom-class" />
        <F.TpkCheckboxPrefab @label="test" @validationField="checkbox" class="custom-class" />
        <F.TpkFilePrefab @label="test" @validationField="file" class="custom-class" />
        <button type="submit">Submit</button>
      </TpkForm>
    </template>
  );

  return changeset;
}

export async function setupComponent(params?: TpkFormParams) {
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

export async function setupCurrencyDateComponent(params?: TpkFormParams) {
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
          <F.TpkInputPrefab @label="input" @validationField="input" />
          <F.TpkCurrencyPrefab @label="currency" @validationField="currency" />
          <F.TpkDatepickerPrefab @label="datepicker" @validationField="datepicker" />
          <F.TpkTimepickerPrefab @label="timepicker" @validationField="timepicker" />
          <button type="submit">Submit</button>
        </TpkForm>
      </template>
    );

    return changeset;
  }
