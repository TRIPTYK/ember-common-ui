# TpkValidationDatepicker

A date picker component with built-in validation support using changesets. This component wraps the `TpkDatepicker` component and adds validation error handling.

## Basic Usage

<DocsDemo as |demo|>
<demo.example @name="datepicker-validation.hbs">
<TpkValidationDatepicker
@label="Birth Date"
@changeset={{this.changeset}}
@validationField="birthDate"
@onChange={{this.onChange}}
@dateFormat="d/m/Y"
as |D|>
<D.Label />
<D.Input />
<div>
{{#each D.errors as |error|}}
<span class="error-message">
{{error.message}}
</span>
{{/each}}
</div>
</TpkValidationDatepicker>
</demo.example>
<demo.snippet @name="datepicker-validation.hbs"/>
</DocsDemo>

## Arguments

### Required Arguments

**@label**: Label text for the date picker.

**@changeset**: Changeset instance containing form data and validation.

**@validationField**: Name of the field in the changeset to bind to.

### Optional Arguments

**@onChange**: Function called when date changes. Receives the new date value.

**@classless**: Boolean. If `true`, removes default CSS classes.

**@disabled**: Boolean. If `true`, disables the date picker.

**@mask**: Input mask pattern for date formatting.

**@dateFormat**: Format for displaying dates (e.g., "d/m/Y", "Y-m-d").

**@placeholder**: Placeholder text for the input.

**@enableTime**: Boolean. Enables time selection in addition to date.

**@mode**: Selection mode - `"single"`, `"multiple"`, or `"range"`.

**@minDate**: Minimum selectable date.

**@maxDate**: Maximum selectable date.

**@disabledDates**: Array of dates or function to disable specific dates.

**@defaultDate**: Default date when field is empty.

**@locale**: Locale string for internationalization.

**@allowInput**: Boolean. Allows manual date entry.

See the [TpkDatepicker documentation](../ember-input/datepicker) for all available Flatpickr options.

## Yielded Components

**D.Input**: Date picker input component.

**D.Label**: Label component.

**D.errors**: Array of validation error objects for this field.

**D.hasError**: Boolean indicating if there are validation errors.

**D.firstError**: The first validation error object.

## Validation

The component automatically:

- Updates the changeset when dates are selected
- Displays validation state via the `data-has-error` attribute
- Handles single dates, date ranges, and multiple dates based on `@mode`
- Clears the value when all dates are removed

## CSS

**[data-has-error="false"]**: Applied when there are no validation errors.

**[data-has-error="true"]**: Applied when validation errors exist.

All CSS classes from `TpkDatepicker` are also available.
