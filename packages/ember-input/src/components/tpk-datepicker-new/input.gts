import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TempusDominus, Namespace, DateTime } from '@eonasdan/tempus-dominus';
import { action } from '@ember/object';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

export interface TpkDatepickerNewInput {
  guid: string;
  classless?: boolean;
  disabled?: boolean;
  value?: Date | string;
  stepping?: number;
  multipleDates?: boolean;
  multipleDatesSeparator?: string;
  range?: boolean;
  useCurrent?: boolean;
  promptTimeOnDateChange?: boolean;
  allowInputToggle?: boolean;
  todayButton?: boolean;
  clearButton?: boolean;
  closeButton?: boolean;
  showTime?: boolean;
  showCalendar?: boolean;
  showSecond?: boolean;
  keepOpen?: boolean;
  locale?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  daysOfWeekDisabled?: number[];
  disabledTimeIntervals?: { from: Date; to: Date }[];
  disabledDates?: Date[];
  enabledDates?: Date[];
  disabledHours?: number[];
  enabledHours?: number[];
  viewMode?: 'clock' | 'calendar' | 'months' | 'years' | 'decades';
  onChange: (value: Date | Date[] | undefined) => void;
}

export interface TpkDatepickerNewInputComponentSignature {
  Args: TpkDatepickerNewInput;
  Element: HTMLInputElement;
}

export class HTMLInputTDElement extends HTMLInputElement {
  declare _tempusDominus: TempusDominus;
}

export default class TpkDatepickerNewInputComponent extends Component<TpkDatepickerNewInputComponentSignature> {
  @tracked declare datepicker: TempusDominus;

  @action
  setTempusDominus(element: HTMLDivElement) {
    const input = element.querySelector(`#${this.args.guid}`) as HTMLElement;

    this.datepicker = new TempusDominus(input, {
      container: element,
      defaultDate: this.args.value as DateTime | undefined,
      useCurrent: this.args.useCurrent === true ? true : false,
      allowInputToggle: this.args.allowInputToggle,
      dateRange: this.args.range,
      multipleDates: this.args.multipleDates,
      multipleDatesSeparator: this.args.multipleDatesSeparator,
      promptTimeOnDateChange: this.args.promptTimeOnDateChange,
      stepping: this.args.stepping ?? 1,
      display: {
        viewMode: this.args.viewMode,
        keepOpen: this.args.keepOpen === false ? false : true,
        icons: {
          date: 'icon icon-calendar',
          time: 'icon icon-time',
          up: 'icon icon-up',
          down: 'icon icon-down',
          next: 'icon icon-next',
          previous: 'icon icon-previous',
          today: 'icon icon-today',
          clear: 'icon icon-clear',
          close: 'icon icon-close',
        },
        buttons: {
          today: this.args.todayButton,
          clear: this.args.clearButton === false ? false : true,
          close: this.args.closeButton === false ? false : true,
        },
        components: {
          calendar: this.args.showCalendar === false ? false : true,
          date: this.args.showCalendar === false ? false : true,
          month: this.args.showCalendar === false ? false : true,
          year: this.args.showCalendar === false ? false : true,
          decades: this.args.showCalendar === false ? false : true,
          clock: this.args.showTime,
          hours: this.args.showTime,
          minutes: this.args.showTime,
          seconds: this.args.showSecond,
        },
      },
      localization: {
        locale: this.args.locale ?? 'fr',
        format: this.args.format ?? 'dd/MM/yyyy',
      },
      restrictions: {
        minDate: this.args.minDate as DateTime | undefined,
        maxDate: this.args.maxDate as DateTime | undefined,
        daysOfWeekDisabled: this.args.daysOfWeekDisabled,
        disabledTimeIntervals: this.args.disabledTimeIntervals as
          | { from: DateTime; to: DateTime }[]
          | undefined,
        disabledDates:
          (this.args.disabledDates as DateTime[] | undefined) ?? [],
        enabledDates: (this.args.enabledDates as DateTime[] | undefined) ?? [],
        disabledHours: this.args.disabledHours,
        enabledHours: this.args.enabledHours,
      },
    });

    // Set the datepicker instance on the input element in order to use it in testing
    (input as HTMLInputTDElement)._tempusDominus = this.datepicker;

    if (this.args.onChange) {
      this.datepicker.subscribe(Namespace.events.change, () => {
        if (this.args.multipleDates || this.args.range) {
          // Workaround to trigger change event after at least 2 dates are picked
          if (this.datepicker.dates.picked.length > 1) {
            return this.args.onChange(this.datepicker.dates.picked);
          }
        }
        this.args.onChange(this.datepicker.dates.picked);
      });
    }
  }
  <template>
    <div
      class={{unless @classless 'tpk-input-input-container'}}
      {{didInsert this.setTempusDominus}}
    >
      <input
        disabled={{@disabled}}
        class={{unless @classless 'tpk-input-input'}}
        id={{@guid}}
        aria-autocomplete='none'
        autocomplete='off'
        autofill='off'
        ...attributes
      />
    </div>
  </template>
}
