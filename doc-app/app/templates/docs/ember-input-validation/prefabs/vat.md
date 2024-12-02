# Input vat

This is an input with a built-in mask for VAT number.
Natively, it does supports belgium, french, luxembourgish, dutch and german VAT.

If the country is not supported, the input value will be blocked after 2 uppercase letters

<DocsDemo as |demo|>
  <demo.example @name="tpk-vat.hbs">
      <Prefabs::TpkValidationVat 
        @label="VAT"
        @placeholder="Enter vat"
        @changeset={{this.changeset}} 
        @validationField="vat"
      />
      <Prefabs::TpkValidationVat 
        @label="Disabled"
        @placeholder="Enter vat"
        @disabled={{true}}
        @changeset={{this.changeset}} 
        @validationField="disabled"
      />
      <Prefabs::TpkValidationVat 
        @label="Error"
        @placeholder="Enter vat"
        @changeset={{this.changeset}} 
        @validationField="error"
      />
  </demo.example>
  <demo.snippet @name="tpk-vat.hbs"/>
</DocsDemo>

## Usage

The `TpkValidationVat` component is used for a vat input.

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.

## Optional properties

- `@label`: The label for the input field.
- `@placeholder`: The placeholder text for the input field.
- `@mandatory`: Whether the textarea field is mandatory.
- `@disabled`: Whether the input field is disabled.
- `@onChange`: The action to be called when the selection changes. 
- `@changeEvent`: The event to trigger the onChange action.

