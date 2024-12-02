# Datepicker Input Field

This component provides a datepicker and built-in validation.

<DocsDemo as |demo|>
  <demo.example @name="prefab-tpk-datepicker.hbs">
    <Prefabs::TpkValidationDatepicker
      @label="Datepicker"
      @changeset={{this.changeset}}
      @validationField="birthday"
    />
    <Prefabs::TpkValidationDatepicker
      @label="Disabled"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled=true
    />
    <Prefabs::TpkValidationDatepicker
      @label="Error"
      @changeset={{this.changeset}}
      @validationField="error"
    />
  </demo.example>
  <demo.snippet @name="prefab-tpk-datepicker.hbs" />
</DocsDemo>

## Usage

The `TpkValidationDatepicker` component is designed for easy integration into your forms. It provides a standardized way to collect date with validation.

## Mandatory properties

- `@validationField`: The field name in the changeset for validation.
- `@changeset`: The changeset object for form validation.

### Properties

- `@multipleDatesSeparator`: The separator to use when multiple dates are selected. Defaults to ' - '.
- `@label`: The label for the input field.
- `@onChange`: The action to be called when the date changes.
- `@onClose`: The action to be called when the datepicker closes.
- `@disabled`: Whether the input field is disabled.
- `@mandatory`: To indicate if input is mandatory.
- `@placeholder`: The placeholder text for the input field.
- `@clearButton`: Whether to show a button to clear the input field.
- `@todayButton`: Whether to show a button to select today's date.
- `@closeButton`: Whether to show a button to close the datepicker.
- `@minDate`: The minimum selectable date.
- `@maxDate`: The maximum selectable date.
- `@keepOpen`: Whether to keep the datepicker open after selection.
- `@daysOfWeekDisabled`: An array of day numbers to disable (0-6, where 0 is Sunday).
- `@disabledDates`: An array of dates to disable.
- `@viewMode`: The initial view mode of the date picker. Can be 'clock', 'calendar', 'months', 'years', or 'decades'.
- `@locale`: The locale to be used for date formatting.
- `@dateFormat`: The format for displaying the selected date.
- `@promptTimeOnDateChange`: Whether to prompt the time when the date changes.
- `@noCalendar`: Whether to hide the calendar.
- `@enableTime`: Whether to show the time picker.
- `@stepping`: The stepping of the time picker.
- `@enableSecond`: Whether to show the second picker.
- `@disabledTimeIntervals`: An array of time intervals to disable.
- `@disabledHours`: An array of hours to disable.
- `@enabledHours`: An array of hours to enable.
