# TpkForm

> Looking for a complete example? [Jump to the complete example](#complete-example-of-using-tpkform)

The `TpkForm` component is a form component that uses the `ember-immer-changeset` and `yup` libraries to provide a simple way to create forms with validation. The form yields each component from ember-input-validation as a block component.

By default, the changeset is [executed](https://triptyk.github.io/ember-immer-changeset/classes/ImmerChangeset.html#execute) if the form submitted is valid.
<DocsDemo as |demo|>
    <demo.example @name="tpk-form.hbs">
       <TpkForm
          @changeset={{this.changeset}}
          @onSubmit={{this.success}}
          @validationSchema={{this.validationSchema}} 
          @autoScrollOnError={{false}}
          class="form-doc"
        as |F|>
          <F.TpkInput @label="First Name" @validationField="firstName" as |I|>
            <I.Label/>
            <I.Input />
            {{#if I.errors}}
              {{#each I.errors as |error|}}
                <div>{{error.message}}</div>
              {{/each}}
            {{/if}}
          </F.TpkInput>
          <F.TpkInputPrefab @label="Last Name" @validationField="lastName" />
          <F.TpkSelectPrefab @label="languages" @validationField="languages" @multiple={{true}} @options={{this.options}} />
          <br/>
          <button class="button" type="submit">Submit</button>
       </TpkForm>
    </demo.example>
    <demo.snippet @name="tpk-form.hbs"/>
    <demo.snippet @name="tpk-form-controller.js" />
</DocsDemo>


## Arguments

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| changeset | [ImmerChangeset](https://triptyk.github.io/ember-immer-changeset/classes/ImmerChangeset.html) | | The changeset to use for the form |
| onSubmit | Function | | The function to execute when the form is submitted and valid. The changeset is the only argument passed to this function |
| validationSchema | [Yup Object](https://www.npmjs.com/package/yup) | | The yup validation schema to use for the form |
| reactive | Boolean | true | Whether or not the form should be reactive (a.k.a. validate the changeset on value change) |
| executeOnValid | Boolean | true | Whether or not the changeset should be executed if the form is valid |
| disabled | Boolean | false | Whether or not the form and the inputs should be disabled |
| removeErrorsOnSubmit | Boolean | true | Whether or not the errors should be removed when the form is submitted |
| autoScrollOnError | Boolean | true | Whether or not the form should scroll to the first error when the form is submitted |

## Yielded Components

The `TpkForm` component yields the following components:

### Base Components
- TpkValidationInput yielded as `TpkInput`
- TpkValidationTextarea yielded as `TpkTextarea`
- TpkValidationSelect yielded as `TpkSelect`
- TpkValidationCheckbox yielded as `TpkCheckbox`
- TpkValidationRadio yielded as `TpkRadio`
- TpkValidationRadioGroup yielded as `TpkRadioGroup`
- TpkValidationFile yielded as `TpkFile`
- TpkValidationDatePicker yielded as `TpkDatepicker`

### Prefab Components
- TpkValidationInputPrefab yielded as `TpkInputPrefab`
- TpkValidationTextareaPrefab yielded as `TpkTextareaPrefab`
- TpkValidationSelectPrefab yielded as `TpkSelectPrefab`
- TpkValidationSelectCreatePrefab yielded as `TpkSelectCreatePrefab`
- TpkValidationSelectSearchPrefab yielded as `TpkSelectSearchPrefab`
- TpkValidationCheckboxPrefab yielded as `TpkCheckboxPrefab`
- TpkValidationRadioPrefab yielded as `TpkRadioPrefab`
- TpkValidationRadioGroupPrefab yielded as `TpkRadioGroupPrefab`
- TpkValidationDatepickerPrefab yielded as `TpkDatepickerPrefab`
- TpkValidationDatepickerRangePrefab yielded as `TpkDatepickerRangePrefab`
- TpkValidationTimepickerPrefab yielded as `TpkTimepickerPrefab`

### Specialized Input Prefabs
- TpkValidationPasswordPrefab yielded as `TpkPasswordPrefab`
- TpkValidationEmailPrefab yielded as `TpkEmailPrefab`
- TpkValidationIBANPrefab yielded as `TpkIbanPrefab`
- TpkValidationBicPrefab yielded as `TpkBicPrefab`
- TpkValidationVATPrefab yielded as `TpkVatPrefab`
- TpkValidationNationalNumberPrefab yielded as `TpkNationalNumberPrefab`
- TpkValidationCurrencyPrefab yielded as `TpkCurrencyPrefab`
- TpkValidationIntegerPrefab yielded as `TpkIntegerPrefab`
- TpkValidationNumberPrefab yielded as `TpkNumberPrefab`
- TpkValidationMobilePrefab yielded as `TpkMobilePrefab`

## Yielded values

The `TpkForm` component yields the following values:
| Value | Type | Description |
| --- | --- | --- |
| changesetGet | Function | The [get](https://triptyk.github.io/ember-immer-changeset/classes/ImmerChangeset.html#get) function of the changeset. It is just a shortcut to avoid repeating the @changeset argument. |
| requiredFields | Array | An array of the required fields.

## Changing the default components

The default yielded components are TpkValidation`<Input>` , but you can change the default components by changing the values in the TpkForm service.

```ts
let tpkFormService = this.owner.lookup(
  'service:tpk-form',
) as TpkFormService;

// Base Components
tpkFormService.TpkInput = DummyInput;
tpkFormService.TpkTextarea = DummyTextarea;
tpkFormService.TpkSelect = DummySelect;
tpkFormService.TpkCheckbox = DummyCheckbox;
tpkFormService.TpkRadio = DummyRadio;
tpkFormService.TpkRadioGroup = DummyRadioGroup;
tpkFormService.TpkFile = DummyFile;
tpkFormService.TpkDatepicker = DummyDatepicker;

// Prefab Components
tpkFormService.TpkInputPrefab = DummyInputPrefab;
tpkFormService.TpkTextareaPrefab = DummyTextareaPrefab;
tpkFormService.TpkSelectPrefab = DummySelectPrefab;
tpkFormService.TpkSelectCreatePrefab = DummySelectCreatePrefab;
tpkFormService.TpkSelectSearchPrefab = DummySelectSearchPrefab;
tpkFormService.TpkCheckboxPrefab = DummyCheckboxPrefab;
tpkFormService.TpkRadioPrefab = DummyRadioPrefab;
tpkFormService.TpkRadioGroupPrefab = DummyRadioGroupPrefab;
tpkFormService.TpkDatepickerPrefab = DummyDatepickerPrefab;
tpkFormService.TpkDatepickerRangePrefab = DummyDatepickerRangePrefab;
tpkFormService.TpkTimepickerPrefab = DummyTimepickerPrefab;

// Specialized Input Prefabs
tpkFormService.TpkPasswordPrefab = DummyPasswordPrefab;
tpkFormService.TpkEmailPrefab = DummyEmailPrefab;
tpkFormService.TpkIbanPrefab = DummyIbanPrefab;
tpkFormService.TpkBicPrefab = DummyBicPrefab;
tpkFormService.TpkVatPrefab = DummyVatPrefab;
tpkFormService.TpkNationalNumberPrefab = DummyNationalNumberPrefab;
tpkFormService.TpkCurrencyPrefab = DummyCurrencyPrefab;
tpkFormService.TpkIntegerPrefab = DummyIntegerPrefab;
tpkFormService.TpkNumberPrefab = DummyNumberPrefab;
tpkFormService.TpkMobilePrefab = DummyMobilePrefab;
```

## Validation Behavior

The form handles validation in two ways:
- On submit: The entire form is validated when submitted
- On field change: If `@reactive={{true}}` (default), fields are validated individually when their values change

When validation errors occur:
- If `@autoScrollOnError={{true}}` (default), the form will automatically scroll to the first error
- If `@removeErrorsOnSubmit={{true}}` (default), existing errors are cleared before new validation on submit

## Complete example of using TpkForm

<DocsDemo as |demo|>
    <demo.example @name="tpk-form-complete.hbs">
       <TpkForm
          @changeset={{this.changeset}}
          @onSubmit={{this.success}}
          @validationSchema={{this.validationSchema}} 
          class="form-doc"
        as |F|>
          <div class="form-content">
            <F.TpkInputPrefab @label="First Name" @validationField="firstName" />
            <F.TpkInputPrefab @label="Last Name" @validationField="lastName" />
            <F.TpkEmailPrefab @label="Email" @validationField="email" />
            <F.TpkMobilePrefab @label="Phone" @validationField="phone" />
            <F.TpkDatepickerPrefab @label="Birthdate" @validationField="birthday" />
            <F.TpkSelectPrefab @label="Languages" @validationField="languages" @multiple={{true}} @options={{this.options}} />
            <F.TpkTimepickerPrefab @label="Time" @validationField="time" />
            <F.TpkCurrencyPrefab @label="Available money ?" @validationField="availableMoney" />
            <F.TpkVatPrefab @label="VAT" @validationField="vat" />
            <F.TpkBicPrefab @label="BIC" @validationField="bic" />
            <F.TpkIbanPrefab @label="IBAN" @validationField="iban" />
            <F.TpkRadioGroupPrefab
              @validationField="status"
              @mandatory={{false}}
              @groupLabel="Status"
              @mandatory={{true}}
            as |Radio|>
              <Radio @value="pending" @label="Pending" @selected="pending" />
              <Radio @value="complete" @label="Complete" />
            </F.TpkRadioGroupPrefab>
            <F.TpkPasswordPrefab @label="Password" @validationField="password" />
            <F.TpkCheckboxPrefab @label="Is free ?" @validationField="isFree" />
          </div>
          <br/>
          <button class="button" type="submit">Submit</button>
       </TpkForm>
    </demo.example>
    <demo.snippet @name="tpk-form-complete.hbs"/>
    <demo.snippet @name="tpk-form-controller.js" />
</DocsDemo>
