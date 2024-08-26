# TpkDatepicker

An Ember component for date selection with extensive customization options. This component provides a user interface for selecting dates and applying input masks for formatting.

<DocsDemo as |demo|>
  <demo.example @name="tpk-datepicker.hbs">
      <TpkDatepicker
        @value={{this.selectedDate}}
        @onChange={{this.onChange}}
        @disabled={{this.isDisabled}}
        @mask={{this.dateMask}}
        @allowInput={{this.allowInput}}
        @placeholder={{this.placeholderText}}
        @dateFormat={{this.dateFormat}}
        @onClose={{this.onClose}}
        @label={{this.dateLabel}}
        @classless={{this.classless}}
        @defaultDate={{this.defaultDate}}
        @enableTime={{this.enableTime}}
        @locale={{this.locale}}
        class="tpk-input"
      as |D|>
        <D.Label />
        <D.Input />
      </TpkDatepicker>
  </demo.example>
  <demo.snippet @name="tpk-datepicker.hbs"/>
</DocsDemo>

## Mandatory Arguments

- **value**: The initial date or dates to display in the date picker. Can be a single `Date`, a `string`, an array of `Date` or `string`, or `null`.

    ```typescript
    @tracked selectedDate: Date | string | (Date | string)[] | null = new Date();
    ```

- **onChange**: A function called when the date is changed. Receives the new value and the event as arguments.

    ```typescript
    @action
    onChange(newDate: Date[], event: Event): void {
      this.selectedDate = newDate;
    }
    ```

## Optional Arguments

- **disabled**: A boolean indicating whether the date picker should be disabled.

    ```typescript
    @tracked isDisabled: boolean = false;
    ```

- **mask**: An input mask for formatting the date input when writing, using the IMask library.

    ```typescript
    @tracked dateMask: string = 'd-m/Y';
    ```


- **allowInput**: If `true`, allows manual input.

- **placeholder**: Placeholder text displayed when the date field is empty.

    ```typescript
    @tracked placeholderText: string = 'Enter a date';
    ```

- **dateFormat**: The format for displaying the selected date. Defaults to 'd/m/Y'.

    ```typescript
    @tracked dateFormat: string = 'd/m/Y';
    ```

- **onClose**: A function called when the date picker is closed. Falls back to `onChange` if not defined.

    ```typescript
    @action
    onClose(): void {
      // Custom logic when date picker closes
    }
    ```

- **label**: The title or label displayed with the date picker.

    ```typescript
    @tracked dateLabel: string = 'Select a date:';
    ```

- **classless**: If `true`, the component is rendered without the default 'tpk-datepicker' CSS class.

    ```typescript
    @tracked isClassless: boolean = false;
    ```

- **defaultDate**: The default date to display when the field is empty.

    ```typescript
    @tracked defaultDate: Date = new Date();
    ```

- **enableTime**: Enables time selection in addition to date selection.

    ```typescript
    @tracked enableTime: boolean = false;
    ```

- **locale**: Locale used for date and time formatting.

    ```typescript
    @tracked locale: string = 'en';
    ```

### Flatpicker Arguments

The `TpkDatepicker` component accepts several arguments from the `FlatpickerArgs` interface for additional configuration:

<DocsDemo as |demo|>
  <demo.example @name="tpk-datepicker-advanced.hbs">
      <TpkDatepicker
        @value={{this.selectedDate}}
        @onChange={{this.onChange}}
        @disabled={{this.isDisabled}}
        @mask={{this.dateMask}}
        @allowInput={{this.allowInput}}
        @placeholder={{this.placeholderText}}
        @dateFormat={{this.dateFormat}}
        @onClose={{this.onClose}}
        @label={{this.dateLabel}}
        @classless={{this.isClassless}}
        @defaultDate={{this.defaultDate}}
        @enableTime={{this.enableTime}}
        @locale={{this.locale}}
        @inline={{this.isInline}}
        @maxDate={{this.maxDate}}
        @minDate={{this.minDate}}
        @showMonths={{this.showMonths}}
        @weekNumbers={{this.weekNumbers}}
      as |D|>
        <D.Label />
        <D.Input />
      </TpkDatepicker>
  </demo.example>
  <demo.snippet @name="tpk-datepicker-advanced.hbs"/>
</DocsDemo>

- **altFormat**: Alternate date format to display in the input.

- **altInput**: If `true`, an alternative input is used.

- **altInputClass**: CSS class for the alternate input.

- **allowInvalidPreload**: If `true`, allows invalid preloading of the date.

- **appendTo**: Element or selector to append the calendar to.

- **ariaDateFormat**: ARIA date format for accessibility.

- **conjunction**: Conjunction for range mode.

- **clickOpens**: If `true`, opens the date picker on click.

- **dateFormat**: Date format(s) for the picker.

- **defaultDate**: Default date when the field is empty.

- **defaultHour**: Default hour for time picker.

- **defaultMinute**: Default minute for time picker.

- **disable**: Dates or ranges to disable.

- **disabledDates**: Dates to disable in the picker.

- **disableMobile**: If `true`, disables mobile view.

- **enable**: Dates or ranges to enable.

- **enableTime**: If `true`, enables time selection.

- **enableSeconds**: If `true`, enables seconds in time selection.

- **formatDate**: Function to format the date.

- **hourIncrement**: Increment for hour selection.

- **inline**: If `true`, displays the picker inline.

- **maxDate**: Maximum selectable date.

- **minDate**: Minimum selectable date.

- **minuteIncrement**: Increment for minute selection.

- **mode**: Mode of the picker ('single', 'multiple', or 'range').

- **nextArrow**: HTML for the next month arrow.

- **noCalendar**: If `true`, disables the calendar view.

- **onClose**: Callback function when the picker is closed.

- **onOpen**: Callback function when the picker is opened.

- **onReady**: Callback function when the picker is ready.

- **parseDate**: Function to parse date strings.

- **position**: Position of the picker ('auto', 'top', 'right', 'bottom', 'left').

- **positionElement**: Element to position the picker relative to.

- **prevArrow**: HTML for the previous month arrow.

- **shorthandCurrentMonth**: If `true`, uses shorthand for the current month.

- **showMonths**: Number of months to show.

- **time_24hr**: If `true`, uses 24-hour time format.

- **weekNumbers**: If `true`, shows week numbers.

- **wrap**: If `true`, wraps the date picker.

- **monthSelectorType**: Type of month selector ('dropdown' or 'static').

- **static**: If `true`, uses static positioning.

- **placeholder**: Placeholder text for the input.

- **id**: ID for the input element.


- **inline**: If `true`, html is add near of the element.

    ```typescript
    @tracked isInline: boolean = false;
    ```
