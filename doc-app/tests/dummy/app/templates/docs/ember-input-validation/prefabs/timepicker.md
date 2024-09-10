# Timepicker Input Field

This component provides a timepicker with built-in validation.

<DocsDemo as |demo|>
  <demo.example @name="tpk-timepicker.hbs">
    <Prefabs::TpkValidationTimepicker
      @label="Timepicker"
      @changeset={{this.changeset}}
      @validationField="time"
      class="tpk-input"
    />
  </demo.example>
  <demo.snippet @name="tpk-timepicker.hbs" />
</DocsDemo>

## Usage

The `TpkValidationTimepicker` component is designed for easy integration into your forms. It provides a standardized way to collect hours, minutes and also seconds (if you enable the option `enableSecond`).

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.

### Properties

- `@label`: The label for the input field.
- `@onChange`: The action to be called when the date changes.
- `@onClose`: The action to be called when the datepicker closes.
- `@disabled`: Whether the input field is disabled.
- `@classless`: Whether to apply default classes to the component.
- `@mandatory`: To indicate if input is mandatory.
- `@enableSecond`: Whether to enable seconds in the timepicker.
- `@stepping`: The step interval for minutes and seconds.
- `@placeholder`: The placeholder text for the input field.
- `@clearButton`: Whether to show a button to clear the input field.
- `@locale`: The locale to be used for date formatting.

