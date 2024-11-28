# Currency

The currency validation prefab is used to validate currency input fields. 

It is provided with a mask to format the input field as currency.

The only supported format is euro at the moment.

<DocsDemo as |demo|>
  <demo.example @name="tpk-currency.hbs">
      <Prefabs::TpkValidationCurrency
        @label="Amount"
        @placeholder="Enter an amount"
        @changeset={{this.changeset}} 
        @validationField="value"
        @changeEvent="change"
      />
      <Prefabs::TpkValidationCurrency
        @label="Amount"
        @changeset={{this.changeset}} 
        @disabled=true
        @validationField="disabled"
        @changeEvent="change"
      />
      <Prefabs::TpkValidationCurrency
        @label="Amount"

        @changeset={{this.changeset}} 
        @validationField="error"
        @changeEvent="change"
      />
  </demo.example>
  <demo.snippet @name="tpk-currency.hbs"/>
</DocsDemo>

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.

## Optional properties

- `@label`: The label for the input field.
- `@disabled`: Whether the input field is disabled.
- `@mandatory`: Whether the textarea field is mandatory.
- `@onChange`: The action to be called when the selection changes. 
- `@changeEvent`: The event to trigger the onChange action.