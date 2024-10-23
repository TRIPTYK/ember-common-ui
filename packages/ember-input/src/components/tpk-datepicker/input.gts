import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TempusDominus, Namespace, DateTime } from '@eonasdan/tempus-dominus';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

export interface TpkDatepickerInput {
  classless?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value: Date | string | null;
  stepping?: number;
  mode?: 'multiple' | 'range';
  multipleDatesSeparator?: string;
  useCurrent?: boolean;
  promptTimeOnDateChange?: boolean;
  todayButton?: boolean;
  clearButton?: boolean;
  closeButton?: boolean;
  enableTime?: boolean;
  noCalendar?: boolean;
  enableSecond?: boolean;
  keepOpen?: boolean;
  locale?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  daysOfWeekDisabled?: number[];
  disabledTimeIntervals?: { from: Date; to: Date }[];
  disabledDates?: Date[];
  enabledDates?: Date[];
  disabledHours?: number[];
  enabledHours?: number[];
  viewMode?: 'clock' | 'calendar' | 'months' | 'years' | 'decades';
  onChange: (value: Date[]) => void;
  onClose?: () => void;
}

export interface TpkDatepickerInputComponentSignature {
  Args: TpkDatepickerInput & { guid: string };
  Element: HTMLInputElement;
}

export class HTMLInputTDElement extends HTMLInputElement {
  declare _tempusDominus: TempusDominus;
}

export default class TpkDatepickerNewInputComponent extends Component<TpkDatepickerInputComponentSignature> {
  @tracked declare datepicker: TempusDominus;

  get value() {
    return this.args.value === null ? undefined : this.args.value;
  }

  @action
  setTempusDominus(element: HTMLDivElement) {
    const input = element.querySelector(`#${this.args.guid}`) as HTMLElement;
    this.datepicker = new TempusDominus(input, {
      container: element,
      defaultDate: this.value as DateTime | undefined,
      useCurrent: this.args.useCurrent === true ? true : false,
      allowInputToggle: false,
      dateRange: this.args.mode === 'range' ? true : false,
      multipleDates: this.args.mode === 'multiple' ? true : false,
      multipleDatesSeparator: this.args.multipleDatesSeparator,
      promptTimeOnDateChange: this.args.promptTimeOnDateChange,
      stepping: this.args.stepping ?? 5,
      display: {
        viewMode: this.args.viewMode,
        keepOpen: this.args.keepOpen === true ? true : false,
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
          calendar: this.args.noCalendar === true ? false : true,
          date: this.args.noCalendar === true ? false : true,
          month: this.args.noCalendar === true ? false : true,
          year: this.args.noCalendar === true ? false : true,
          decades: this.args.noCalendar === true ? false : true,
          clock: this.args.enableTime,
          hours: this.args.enableTime,
          minutes: this.args.enableTime,
          seconds: this.args.enableSecond,
        },
      },
      localization: {
        locale: this.args.locale ?? 'fr',
        format: this.args.dateFormat ?? 'dd/MM/yyyy',
      },
      restrictions: {
        minDate: this.args.minDate as DateTime | undefined,
        maxDate: this.args.maxDate as DateTime | undefined,
        daysOfWeekDisabled: this.args.daysOfWeekDisabled,
        disabledTimeIntervals:
          (this.args.disabledTimeIntervals as
            | { from: DateTime; to: DateTime }[]
            | undefined) ?? [],
        disabledDates:
          (this.args.disabledDates as DateTime[] | undefined) ?? [],
        enabledDates: (this.args.enabledDates as DateTime[] | undefined) ?? [],
        disabledHours: this.args.disabledHours ?? [],
        enabledHours: this.args.enabledHours ?? [],
      },
    });

    // Set the datepicker instance on the input element in order to use it in testing
    (input as HTMLInputTDElement)._tempusDominus = this.datepicker;

    if (this.args.onChange) {
      this.datepicker.subscribe(Namespace.events.change, () => {
        if (this.args.mode === 'multiple' || this.args.mode === 'range') {
          // Workaround to trigger change event after at least 2 dates are picked
          if (this.datepicker.dates.picked.length > 1) {
            return this.args.onChange(this.datepicker.dates.picked);
          }
          return;
        }
        this.args.onChange(this.datepicker.dates.picked);
      });
    }
    if (this.args.onClose) {
      this.datepicker.subscribe(Namespace.events.hide, () => {
        this.args.onClose?.();
      });
    }
  }

  @action
  closeDatepicker(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.datepicker.hide();
    }
    if (event.key === 'Tab') {
      this.datepicker.hide();
    }
  }
  <template>
    <div
      class={{unless @classless 'tpk-datepicker-input-input-container'}}
      {{didInsert this.setTempusDominus}}
    >
      <input
        disabled={{@disabled}}
        class={{unless @classless 'tpk-datepicker-input-input'}}
        placeholder={{@placeholder}}
        id={{@guid}}
        aria-autocomplete='none'
        autocomplete='off'
        autofill='off'
        {{on 'keydown' this.closeDatepicker}}
        data-test-tpk-datepicker-content
        ...attributes
      />
    </div>
  </template>
}
