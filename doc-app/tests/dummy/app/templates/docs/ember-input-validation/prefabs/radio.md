# Radio button

This component provides a radio button.

<DocsDemo as |demo|>
  <demo.example @name="tpk-validation-prefab-radio.hbs">
    <Prefabs::TpkValidationRadio @changeset={{this.changeset}} @validationField="radio" @label="This" @mandatory={{true}} @value="selected one" @classless=true />
    <Prefabs::TpkValidationRadio @changeset={{this.changeset}} @validationField="radio" @label="That" @mandatory={{true}} @value="selected two"/>

    selected : {{changeset-get this.changeset 'radio'}}
  </demo.example>
  <demo.snippet @name="tpk-validation-prefab-radio.hbs"/>
</DocsDemo>

## Usage

The `TpkValidationRadio` component is used for a simple radio button. 

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.
- `@value`: value to pass on changeset if selected.

## Optional properties

- `@label`: The label for the input field.
- `@mandatory`: Whether the textarea field is mandatory.
- `@disabled`: Whether the input field is disabled.
- `@classless`: Whether to apply default classes to the component.
- `@onChange`: The action to be called when the selection changes. 

## Css classes

- `.tpk-radio` : CSS class for styling the input of the radio button (label and input box).
- `.tpk-radio-label` : CSS class for styling the label of the input.