# @triptyk/ember-input-validation

Form validation layer for `@triptyk/ember-input` components.

For full documentation, visit [triptyk.github.io/ember-common-ui](https://triptyk.github.io/ember-common-ui/).

## Compatibility

- Ember.js v6.0 or above
- Embroider

## Installation

```sh
pnpm add @triptyk/ember-input-validation
```

## Prefabs

Always pick the most specific prefab for the data: a phone number goes in `TpkMobilePrefab`, an IBAN in `TpkIbanPrefab`, an amount in `TpkCurrencyPrefab`, a date in `TpkDatepickerPrefab`… `TpkInputPrefab` is only for free text. Specific prefabs bring the right mask and formatting.

Inside a `<TpkForm>`, use the yielded prefabs (`F.TpkIbanPrefab`): `@changeset`, `@disabled` and `@requiredFields` are already bound. Outside a form, import `@triptyk/ember-input-validation/components/prefabs/tpk-validation-<name>`.

```gts
<TpkForm
  @changeset={{this.changeset}}
  @validationSchema={{this.validationSchema}}
  @onSubmit={{this.onSubmit}}
  as |F|
>
  <F.TpkMobilePrefab @label="Phone" @validationField="phone" />
  <F.TpkIbanPrefab @label="IBAN" @validationField="iban" />
</TpkForm>
```

<!-- The catalogue below is generated from the doc-app: run `pnpm --filter doc-app docs:readme`. -->

<!-- prefabs:start -->

### Index

| Prefab                                                  | For                                |
| ------------------------------------------------------- | ---------------------------------- |
| [`TpkBicPrefab`](#tpkbicprefab)                         | BIC                                |
| [`TpkCheckboxPrefab`](#tpkcheckboxprefab)               | Checkbox                           |
| [`TpkCurrencyPrefab`](#tpkcurrencyprefab)               | Currency                           |
| [`TpkDatepickerPrefab`](#tpkdatepickerprefab)           | Datepicker                         |
| [`TpkDatepickerRangePrefab`](#tpkdatepickerrangeprefab) | Datepicker Range validation prefab |
| [`TpkEmailPrefab`](#tpkemailprefab)                     | Email                              |
| [`TpkFilePrefab`](#tpkfileprefab)                       | File                               |
| [`TpkFileListPrefab`](#tpkfilelistprefab)               | File List                          |
| [`TpkIbanPrefab`](#tpkibanprefab)                       | IBAN                               |
| [`TpkInputPrefab`](#tpkinputprefab)                     | Input                              |
| [`TpkIntegerPrefab`](#tpkintegerprefab)                 | Integer                            |
| [`TpkMobilePrefab`](#tpkmobileprefab)                   | Mobile                             |
| [`TpkNationalNumberPrefab`](#tpknationalnumberprefab)   | National Number                    |
| [`TpkNumberPrefab`](#tpknumberprefab)                   | Number                             |
| [`TpkPasswordPrefab`](#tpkpasswordprefab)               | Password                           |
| [`TpkRadioPrefab`](#tpkradioprefab)                     | Radio                              |
| [`TpkRadioGroupPrefab`](#tpkradiogroupprefab)           | Radio Group                        |
| [`TpkSelectPrefab`](#tpkselectprefab)                   | Select                             |
| [`TpkSelectCreatePrefab`](#tpkselectcreateprefab)       | Select Create                      |
| [`TpkSelectSearchPrefab`](#tpkselectsearchprefab)       | Select Search                      |
| [`TpkTextareaPrefab`](#tpktextareaprefab)               | Textarea                           |
| [`TpkTimepickerPrefab`](#tpktimepickerprefab)           | Timepicker                         |
| [`TpkVatPrefab`](#tpkvatprefab)                         | VAT                                |

### Common arguments

Accepted by most prefabs. Each prefab below lists only its other arguments, and the common ones it does not support.

- `@validationField` (`string`, required): The field name in the changeset for validation.
- `@changeset` (`ImmerChangeset`, required): The changeset object for form validation.
- `@label` (`string`): The label for the input field.
- `@placeholder` (`string`): The placeholder text for the input field.
- `@mandatory` (`boolean`): Whether the input field is mandatory.
- `@disabled` (`boolean`): Whether the input field is disabled.
- `@onChange` (`function`): The action to be called when the value changes.
- `@changeEvent` (`string`): The event to trigger the onChange action.

### Catalogue

#### TpkBicPrefab

This is an input with a built-in mask for BIC. The mask should be compatible for any BIC and text can only be in capital letters. [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/bic)

#### TpkCheckboxPrefab

A validated checkbox component with label and integrated error handling. [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/checkbox)

- `@onChange` (`(isChecked: boolean, value: string, e: Event) => void`): Callback called with the checked state, value, and native event when the checkbox changes.

Does not support: `@placeholder`, `@changeEvent`.

#### TpkCurrencyPrefab

A reusable validation component for currency input with integrated error handling and euro formatting mask. [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/currency)

#### TpkDatepickerPrefab

A reusable validation component for date selection with integrated error handling and extensive customization options. [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/datepicker)

- `@multipleDatesSeparator` (`string`): The separator to use when multiple dates are selected. Defaults to ' - '.
- `@onClose` (`function`): The action to be called when the datepicker closes.
- `@clearButton` (`boolean`): Whether to show a button to clear the input field.
- `@todayButton` (`boolean`): Whether to show a button to select today's date.
- `@closeButton` (`boolean`): Whether to show a button to close the datepicker.
- `@minDate` (`Date`): The minimum selectable date.
- `@maxDate` (`Date`): The maximum selectable date.
- `@keepOpen` (`boolean`): Whether to keep the datepicker open after selection.
- `@daysOfWeekDisabled` (`Array<number>`): An array of day numbers to disable (0-6, where 0 is Sunday).
- `@disabledDates` (`Array<Date>`): An array of dates to disable.
- `@viewMode` (`string`): The initial view mode of the date picker. Can be 'clock', 'calendar', 'months', 'years', or 'decades'.
- `@locale` (`string`): The locale to be used for date formatting.
- `@dateFormat` (`string`): The format for displaying the selected date.
- `@promptTimeOnDateChange` (`boolean`): Whether to prompt the time when the date changes.
- `@noCalendar` (`boolean`): Whether to hide the calendar.
- `@enableTime` (`boolean`): Whether to show the time picker.
- `@stepping` (`number`): The stepping of the time picker.
- `@enableSecond` (`boolean`): Whether to show the second picker.
- `@disabledTimeIntervals` (`Array`): An array of time intervals to disable.
- `@disabledHours` (`Array<number>`): An array of hours to disable.
- `@enabledHours` (`Array<number>`): An array of hours to enable.

Does not support: `@changeEvent`.

#### TpkDatepickerRangePrefab

A reusable validation component for date range selection with integrated error handling [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/datepicker-range)

- `@multipleDatesSeparator` (`string`): The separator to use when multiple dates are selected. Defaults to " - "
- `@onClose` (`function`): Callback function triggered when the datepicker closes
- `@clearButton` (`boolean`): Whether to show a button to clear the selected dates
- `@todayButton` (`boolean`): Whether to show a button to select today's date
- `@closeButton` (`boolean`): Whether to show a button to close the datepicker
- `@minDate` (`Date`): The minimum selectable date
- `@maxDate` (`Date`): The maximum selectable date
- `@keepOpen` (`boolean`): Whether to keep the datepicker open after date selection
- `@daysOfWeekDisabled` (`number[]`): An array of day numbers to disable (0-6, where 0 is Sunday)
- `@disabledDates` (`Date[]`): An array of specific dates to disable
- `@viewMode` (`string`): The initial view mode of the date picker. Can be 'clock', 'calendar', 'months', 'years', or 'decades'
- `@locale` (`string`): The locale to be used for date formatting
- `@dateFormat` (`string`): The format for displaying the selected date

Does not support: `@changeEvent`.

#### TpkEmailPrefab

A reusable validation component for email input with integrated error handling [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/email)

#### TpkFilePrefab

A reusable validation component for single file upload with integrated error handling [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/file)

Does not support: `@placeholder`.

#### TpkFileListPrefab

A reusable validation component for multiple file upload with drag and drop support, integrated error handling, and file management features [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/file-list)

Not yielded by `<TpkForm>`: import `@triptyk/ember-input-validation/components/prefabs/tpk-validation-file-list`.

- `@disableDownload` (`boolean`): Whether the download button is disabled

Does not support: `@changeEvent`.

#### TpkIbanPrefab

A reusable validation component for IBAN input with built-in mask supporting Belgian, French, Luxembourgish, Dutch and German IBANs with automatic formatting [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/iban)

#### TpkInputPrefab

This component provides a validated input field with label and error handling. [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/input)

- `@type` (`string`): The type of the input field. Defaults to 'text'.
- `@mask` (`string`): The mask to apply to the input field.
- `@maskOptions` (`object`): The options to apply to the mask.
- `@unmaskValue` (`boolean`): Whether to unmask the value before setting it in the changeset.

#### TpkIntegerPrefab

A reusable validation component for integer input that prevents decimal numbers and can be restricted to unsigned values (minimum 0) or allow negative numbers [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/integer)

- `@unsigned` (`boolean`): Whether to restrict the input to unsigned integers (minimum 0), preventing negative numbers

#### TpkMobilePrefab

A reusable validation component for mobile phone numbers with country prefix support (Luxembourg, Germany, Netherlands, Belgium, France) and integrated error handling [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/mobile)

#### TpkNationalNumberPrefab

A reusable validation component for Belgian national number input with built-in mask that formats the number in the pretty format similar to the one on Belgian ID cards [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/national-number)

#### TpkNumberPrefab

The number validation input can be blocked at a minimum of 0 or be a negative number. [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/number)

- `@unsigned` (`boolean`): Whether the number input should only accept positive values (minimum 0).
- `@min` (`number`): The minimum value for the number input.
- `@step` (`number`): The step increment for the number input.
- `@requiredFields` (`string[]`): Array of required field names for validation.

#### TpkPasswordPrefab

A reusable validation component for password input fields with secure masking and integrated error handling [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/password)

#### TpkRadioPrefab

A reusable validation component for single radio button with integrated error handling [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/radio)

- `@value` (`string`, required): Value to pass to the changeset if the radio button is selected.
- `@classless` (`boolean`): Whether to apply default CSS classes to the component.

Does not support: `@placeholder`, `@changeEvent`.

#### TpkRadioGroupPrefab

A reusable validation component for radio button groups with integrated error handling and customizable options [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/radio-group)

- `@value` (`string`, required): Value to pass to the changeset if the radio option is selected.
- `@groupLabel` (`string`): The label for the radio button group.
- `@classless` (`boolean`): Whether to apply default CSS classes to the component.

Does not support: `@label`, `@placeholder`, `@changeEvent`.

#### TpkSelectPrefab

A powerful select component with built-in validation using ember-power-select [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/select)

- `@options` (`Array`, required): The options to display in the select dropdown. Each option should have a toString() method for display.
- `@multiple` (`boolean`): Whether multiple selections are allowed.
- `@initiallyOpened` (`boolean`): Whether the select dropdown is initially opened.
- `@allowClear` (`boolean`): Whether to show a button to clear the selection.
- `@labelComponent` (`Component`): The custom component to use for the label.
- `@selectedItemComponent` (`Component`): The custom component to use for the selected item.
- `@placeholderComponent` (`Component`): The custom component to use for the placeholder.

Does not support: `@changeEvent`.

#### TpkSelectCreatePrefab

A powerful select component with ability to create new values and built-in validation using ember-power-select and ember-power-select-with-create [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/select-create)

- `@options` (`Array`, required): The options to display in the select dropdown. Each option should have a toString() method.
- `@onCreate` (`function`, required): The action to be called when user creates a new value. Should return the newly created option object.
- `@multiple` (`boolean`): Whether multiple selections are allowed.
- `@initiallyOpened` (`boolean`): Whether the select dropdown is initially opened.
- `@allowClear` (`boolean`): Whether to show a button to clear the selection.
- `@labelComponent` (`Component`): The custom component to use for the label.
- `@selectedItemComponent` (`Component`): The custom component to use for the selected item.
- `@placeholderComponent` (`Component`): The custom component to use for the placeholder.
- `@onSearch` (`function`): The action to be called when user types in the search input.
- `@searchPlaceholder` (`string`): The placeholder text for the search input.
- `@searchMessage` (`string`): Message shown in options list when no search has been entered and there are no options.
- `@loadingMessage` (`string`): Message shown in options list when loading options.
- `@noMatchesMessage` (`string`): Message shown in options list when no matches are found.
- `@showCreateWhen` (`function`): The action to be called to determine if the create option should be shown.
- `@buildSuggestion` (`function`): The action to be called to build the suggestion label for the create option.

Does not support: `@changeEvent`.

#### TpkSelectSearchPrefab

A powerful select component with search and built-in validation using ember-power-select [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/select-search)

- `@options` (`Array`, required): An array of selectable options that will be displayed in the dropdown. Each option should have a toString() method for display
- `@onSearch` (`function`, required): A function or ember-concurrency task that handles search logic. Receives the search term as a parameter and should return filtered options. Use with (perform this.onSearch) when using tasks
- `@multiple` (`boolean`): Enables multi-select mode allowing selection of multiple options
- `@initiallyOpened` (`boolean`): Opens the dropdown automatically when the component is rendered
- `@allowClear` (`boolean`): Shows a clear button to remove the selected value when enabled
- `@labelComponent` (`Component`): Custom component to render the label, allowing full customization of label appearance
- `@selectedItemComponent` (`Component`): Custom component to render the selected item in the trigger, providing control over how selections are displayed
- `@placeholderComponent` (`Component`): Custom component to render when no selection is made, replacing default placeholder text
- `@searchPlaceholder` (`string`): Placeholder text displayed in the search input field
- `@searchMessage` (`string`): Message displayed while user is typing in the search field
- `@loadingMessage` (`string`): Message displayed while search results are being loaded (useful for async searches)
- `@noMatchesMessage` (`string`): Message displayed when the search returns no matching results

Does not support: `@changeEvent`.

#### TpkTextareaPrefab

A reusable validation component for textarea fields with integrated error handling and optional character limit [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/textarea)

- `@maxLength` (`number`): The maximum length of the textarea field.

#### TpkTimepickerPrefab

A reusable validation component for time selection with integrated error handling and customizable options [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/timepicker)

- `@onClose` (`Function`): The action to be called when the timepicker closes.
- `@enableSecond` (`boolean`): Whether to enable seconds in the timepicker.
- `@stepping` (`number`): The step interval for minutes and seconds.
- `@clearButton` (`boolean`): Whether to show a button to clear the input field.
- `@locale` (`string`): The locale to be used for time formatting.

Does not support: `@changeEvent`.

#### TpkVatPrefab

An input component with built-in mask for VAT numbers supporting Belgian, French, Luxembourgish, Dutch and German VAT formats [Docs](https://triptyk.github.io/ember-common-ui/docs/ember-input-validation/prefabs/vat)

<!-- prefabs:end -->

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

| oops |
