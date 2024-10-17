# TpkForm

The `TpkForm` component is a form component that uses the `ember-immer-changeset` and `yup` libraries to provide a simple way to create forms with validation. The form yields each component from ember-input-validation as a block component.

By default, the changeset is [executed](https://triptyk.github.io/ember-immer-changeset/classes/ImmerChangeset.html#execute) if the form submitted is valid.
<DocsDemo as |demo|>
    <demo.example @name="tpk-form.hbs">
       <TpkForm
          @changeset={{this.changeset}}
          @onSubmit={{this.success}}
          @validationSchema={{this.validationSchema}} 
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
          <input class="mt-12" type="submit" value="Submit">
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

## Yielded Components

The `TpkForm` component yields the following components:
<DocsLink @route="docs.ember-input-validation.input">
- TpkValidationInput yielded as TpkInput
</DocsLink>
<DocsLink @route="docs.ember-input-validation.prefabs.input">
- TpkValidationInputPrefab yielded as TpkInputPrefab
</DocsLink>
<DocsLink @route="docs.ember-input-validation.checkbox">
- TpkValidationCheckbox yielded as TpkCheckbox
</DocsLink>
<DocsLink @route="docs.ember-input-validation.prefabs.checkbox">
- TpkValidationCheckboxPrefab yielded as TpkCheckboxPrefab
</DocsLink>
<DocsLink @route="docs.ember-input-validation.datepicker">
- TpkValidationDatePicker yielded as TpkDatePicker
</DocsLink>
<DocsLink @route="docs.ember-input-validation.file">
- TpkValidationFile yielded as TpkFile
</DocsLink>
<DocsLink @route="docs.ember-input-validation.radio">
- TpkValidationRadio yielded as TpkRadio
</DocsLink>
<DocsLink @route="docs.ember-input-validation.select">
- TpkValidationSelect yielded as TpkSelect
</DocsLink>
<DocsLink @route="docs.ember-input-validation.textarea">
- TpkValidationTextarea yielded as TpkTextarea
</DocsLink>
<DocsLink @route="docs.ember-input-validation.textarea">
- TpkValidationTextareaPrefab yielded as TpkTextarea
</DocsLink>

## Yielded values

The `TpkForm` component yields the following values:
| Value | Type | Description |
| --- | --- | --- |
| changesetGet | Function | The [get](https://triptyk.github.io/ember-immer-changeset/classes/ImmerChangeset.html#get) function of the changeset. It is just a shortcut to avoid repeating the @changeset argument. |

## Changing the default components

The default yielded components are TpkValidation`<Input>` , but you can change the default components by changing the values in the TpkForm service.

```ts
let tpkFormService = this.owner.lookup(
  'service:tpk-form',
) as TpkFormService;

tpkFormService.TpkInput = DummyInput;
tpkFormService.TpkSelect = DummySelect;
tpkFormService.TpkCheckbox = DummyCheckbox;
tpkFormService.TpkRadio = DummyRadio;
tpkFormService.TpkTextarea = DummyTextarea;
tpkFormService.TpkDatePicker = DummyDatepicker;
tpkFormService.TpkFile = DummyFile;
```
