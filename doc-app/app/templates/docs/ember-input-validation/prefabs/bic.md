# Input iban

This is an input with a built-in mask for BIC.
The mask should be compatible for any BIC.


<DocsDemo as |demo|>
  <demo.example @name="tpk-bic.hbs">
      <Prefabs::TpkValidationBic 
        @label="BIC 1"
        @mandatory={{true}}
        @placeholder="Enter bic"
        @changeset={{this.changeset}} 
        @validationField="bic"
      />
       <Prefabs::TpkValidationInput
        @label="BIC 2"
        @mandatory={{true}}
        @placeholder="Enter bic"
        @changeset={{this.changesetWithErrors}} 
        @validationField="bic"
      />
  </demo.example>
  <demo.snippet @name="tpk-bic.hbs"/>
</DocsDemo>

## Usage

The `TpkValidationBic` component is used for a simple input.

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
