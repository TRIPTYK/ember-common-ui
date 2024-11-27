# Input bic

This is an input with a built-in mask for BIC.
The mask should be compatible for any BIC and text can only be in capital letters.


<DocsDemo as |demo|>
  <demo.example @name="tpk-bic.hbs">
      <Prefabs::TpkValidationBic 
        @label="BIC"
        @mandatory=true
        @placeholder="Enter bic"
        @changeset={{this.changeset}} 
        @validationField="bic"
      />
      <Prefabs::TpkValidationBic
        @label="disabled BIC"
        @mandatory=true
        @disabled=true
        @placeholder="Enter bic"
        @changeset={{this.changeset}} 
        @validationField="disabled"
      />
       <Prefabs::TpkValidationBic
        @label="Error BIC"
        @mandatory=true
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
