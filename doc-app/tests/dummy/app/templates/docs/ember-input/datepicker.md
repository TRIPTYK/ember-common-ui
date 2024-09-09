# TpkDatepicker

An Ember component for date selection with extensive customization options. This component provides a user interface for selecting dates and applying input masks for formatting.

<DocsDemo as |demo|>
  <demo.example @name="tpk-datepicker.hbs">
      <TpkDatepicker
        @label="Date picker"
        @value={{this.selectedDate}}
        @onChange={{this.onChange}}
        class="tpk-input"
      as |D|>
        <D.Label />
        <D.Input />
      </TpkDatepicker>
  </demo.example>
  <demo.snippet @name="tpk-datepicker.hbs"/>
</DocsDemo>

## Mandatory Arguments

- **value**: The initial date or dates to display in the date picker. Can be a single `Date`, a `string`, or `undefined`.

    ```typescript
    @tracked selectedDate: Date | string | undefined = new Date();
    ```

- **onChange**: A function called when the date is changed. Receives the new values as argument.

    ```typescript
    @action
    onChange(dates: Date[]): void {
      this.selectedDate = dates[0];
    }
    ```

## Optional Arguments

- **disabled**: A boolean indicating whether the date picker should be disabled.

- **mask**: An input mask for formatting the date input when writing, using the IMask library.

    ```typescript
    @tracked dateMask: string = 'd-m/Y';
    ```

- **placeholder**: Placeholder text displayed when the date field is empty.

- **format**: The format for displaying the selected date. Defaults to 'dd/MM/yyyy'.

- **onClose**: A function called when the date picker is closed.

- **label**: The title or label displayed with the date picker.

- **classless**: If `true`, the component is rendered without the default 'tpk-datepicker' CSS class. Defaults to `false`

- **stepping**: The number of minutes to step up/down in the time picker. Defaults to 5.

- **multipleDates**: Allow the selection of multiple dates. Defaults to `false`. Returns values after two dates are picked at least

- **multipleDatesSeparator**: The separator to use when multiple dates are selected.

- **range**: Enable date range selection. Defaults to `false`. Returns values after two dates are picked

- **useCurrent**: Use the current date/time as the initial value. Defaults to `false`.

- **promptTimeOnDateChange**: Show the time picker when a date is selected. Defaults to `false`.

- **todayButton**: Show a "Today" button in the date picker. Defaults to `false`.

- **clearButton**: Show a "Clear" button in the date picker. Defaults to `true`.

- **closeButton**: Show a "Close" button in the date picker. Defaults to `true`.

- **enableTime**: Enable time selection. Defaults to `false`.

- **enableCalendar**: Enable calendar selection. Defaults to `true`.

- **enableSecond**: Enable seconds selection in time picker. Defaults to `false`.

- **keepOpen**: Keep the date picker open after selection. Defaults to `false`.

- **locale**: Locale used for the labels in the datepicker. Defaults to `fr`.

- **format**: The format for displaying the selected date. Defaults to 'dd/MM/yyyy'.

- **minDate**: The minimum selectable date.

- **maxDate**: The maximum selectable date.

- **daysOfWeekDisabled**: An array of day numbers to disable (0-6, where 0 is Sunday).

- **disabledTimeIntervals**: An array of time intervals to disable.

- **disabledDates**: An array of dates to disable.

- **enabledDates**: An array of dates to enable (all other dates will be disabled).

- **disabledHours**: An array of hours to disable.

- **enabledHours**: An array of hours to enable (all other hours will be disabled).

- **viewMode**: The initial view mode of the date picker. Can be 'clock', 'calendar', 'months', 'years', or 'decades'.

## Examples

### Date picker range

<DocsDemo as |demo|>
  <demo.example @name="tpk-datepicker-range.hbs">
      <TpkDatepicker
        @label="Date picker range"
        @value={{this.selectedDates}}
        @onChange={{this.onChangeRange}}
        @range={{true}}
        @multipleDatesSeparator=" jusqu'au "
        class="tpk-input"
      as |D|>
        <D.Label />
        <D.Input />
      </TpkDatepicker>
  </demo.example>
  <demo.snippet @name="tpk-datepicker.hbs"/>
</DocsDemo>

### Time picker with mask

<DocsDemo as |demo|>
  <demo.example @name="tpk-datepicker-time.hbs">
      <TpkDatepicker
        @label="Time picker"
        @value={{this.selectedDate}}
        @onChange={{this.onChange}}
        @enableTime={{true}}
        @enableCalendar={{false}}
        @format="HH:mm"
        @mask="H:M"
        class="tpk-input"
      as |D|>
        <D.Label />
        <D.Input />
      </TpkDatepicker>
  </demo.example>
  <demo.snippet @name="tpk-datepicker.hbs"/>
</DocsDemo>

### Date picker with minDate, maxDate and a default value

<DocsDemo as |demo|>
  <demo.example @name="tpk-datepicker-min-max.hbs">
      <TpkDatepicker
        @label="Datepicker"
        @value={{this.date}}
        @onChange={{this.onChange}}
        @minDate={{this.minDate}}
        @maxDate={{this.maxDate}}
        class="tpk-input"
      as |D|>
        <D.Label />
        <D.Input />
      </TpkDatepicker>
  </demo.example>
  <demo.snippet @name="tpk-datepicker.hbs"/>
</DocsDemo>

### Date picker shows month selector first

<DocsDemo as |demo|>
  <demo.example @name="tpk-datepicker-min-max.hbs">
      <TpkDatepicker
        @label="Datepicker"
        @value={{this.selectedDate}}
        @onChange={{this.onChange}}
        @viewMode="months"
        class="tpk-input"
      as |D|>
        <D.Label />
        <D.Input />
      </TpkDatepicker>
  </demo.example>
  <demo.snippet @name="tpk-datepicker.hbs"/>
</DocsDemo>

### Show picker after select a date

<DocsDemo as |demo|>
  <demo.example @name="tpk-datepicker-min-max.hbs">
      <TpkDatepicker
        @label="Datepicker & Timepicker"
        @value={{this.selectedDate}}
        @onChange={{this.onChange}}
        @enableTime={{true}}
        @promptTimeOnDateChange={{true}}
        @format="dd/MM/yyyy | HH:mm"
        class="tpk-input"
      as |D|>
        <D.Label />
        <D.Input />
      </TpkDatepicker>
  </demo.example>
  <demo.snippet @name="tpk-datepicker.hbs"/>
</DocsDemo>
