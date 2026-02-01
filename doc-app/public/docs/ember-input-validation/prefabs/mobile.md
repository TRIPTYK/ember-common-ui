# Mobile Input Field

This component provides a mobile number input field with built-in validation.

You've 5 prefixes : **Luxembourg, Deutshland, Netherlands, Belgium and France.**

<DocsDemo as |demo|>
<demo.example @name="tpk-mobile.hbs">
      <Prefabs::TpkValidationMobile
        @label="Mobile Number"
        @changeset={{this.changeset}}
        @validationField="phone"
        @disabled={{false}}
        @mandatory={{true}}
      />
      <Prefabs::TpkValidationMobile 
        @label="Disabled"
        @changeset={{this.changeset}}
        @disabled={{true}} 
        @validationField="disabled"
      />
      <Prefabs::TpkValidationMobile 
        @label="Error"
        @changeset={{this.changeset}} 
        @validationField="error"
      />
</demo.example>

<demo.snippet @name="tpk-mobile.hbs" />
</DocsDemo>

## Usage

The `TpkValidationMobile` component is designed for easy integration into your forms. It provides a standardized way to collect and validate mobile numbers.

### Properties

- `@label`: The label for the input field (default: "Mobile Number")
- `@changeset`: The changeset object for form validation
- `@validationField`: The field name in the changeset for validation (default: "phone")
- `@disabled`: Whether the input field is disabled (default: false)
- `@mandatory`: To indicate if input is mandatory (default: false)
