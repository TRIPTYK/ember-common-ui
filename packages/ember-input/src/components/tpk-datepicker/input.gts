import type { TOC } from '@ember/component/template-only';
import EmberFlatpickr from 'ember-flatpickr/components/ember-flatpickr';

export interface FlatpickerArgs {
  altFormat?: string;
  altInput?: boolean;
  altInputClass?: string;
  allowInput?: boolean;
  allowInvalidPreload?: boolean;
  appendTo?: HTMLElement | string;
  ariaDateFormat?: string;
  conjunction?: string;
  clickOpens?: boolean;
  dateFormat?: string | Array<string>;
  defaultDate?: string | Date;
  defaultHour?: number;
  defaultMinute?: number;
  disable?: Array<string> | ((date: Date) => boolean);
  disabledDates?: Date[] | ((date: Date) => boolean);
  disableMobile?: boolean;
  enable?: Array<string> | ((date: Date) => boolean);
  enableTime?: boolean;
  enableSeconds?: boolean;
  formatDate?: (date: Date, format: string, locale?: string) => string;
  hourIncrement?: number;
  inline?: boolean;
  maxDate?: string | Date;
  minDate?: string | Date;
  locale?: string;
  minuteIncrement?: number;
  mode?: 'single' | 'multiple' | 'range';
  nextArrow?: string;
  noCalendar?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onOpen?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onReady?: Function;
  parseDate?: (date: string, format: string) => Date | void;
  position?: 'auto' | 'top' | 'right' | 'bottom' | 'left';
  positionElement?: HTMLElement;
  prevArrow?: string;
  shorthandCurrentMonth?: boolean;
  showMonths?: number;
  time_24hr?: boolean;
  weekNumbers?: boolean;
  wrap?: boolean;
  monthSelectorType?: 'dropdown' | 'static';
  static?: boolean;
  placeholder?: string;
  id?: string;
}

export interface TpkDatepickerInputComponentSignature {
  Args: {
    guid: string;
    classless?: boolean;
    disabled?: boolean;
    disabledDates?: Date[] | ((date: Date) => boolean);
    value: Date[] | Date | string | string[];
    onChange: (value: Date[], e: Event) => void;
  } & FlatpickerArgs;
  Element: HTMLInputElement;
}

// https://github.com/typed-ember/glint/issues/599 cast to any to prevent using glint directives
const EmberFlatpickr1 = EmberFlatpickr as any;

// Lot of @glint-expect-error. I do not want to loose all the type safety.
// waiting on ember-flatpickr to be updated to a type safe version.
const TpkDatepickerInputComponent: TOC<TpkDatepickerInputComponentSignature> = <template>
  <EmberFlatpickr1
    data-test-tpk-datepicker-content

    @altFormat={{@altFormat}}

    @altInput={{@altInput}}

    @altInputClass={{@altInputClass}}

    @allowInput={{@allowInput}}

    @allowInvalidPreload={{@allowInvalidPreload}}

    @appendTo={{@appendTo}}

    @ariaDateFormat={{@ariaDateFormat}}

    @conjunction={{@conjunction}}

    @clickOpens={{@clickOpens}}
    @date={{@value}}

    @dateFormat={{@dateFormat}}

    @defaultDate={{@defaultDate}}

    @defaultHour={{@defaultHour}}

    @defaultMinute={{@defaultMinute}}

    @disable={{@disabledDates}}

    @disableMobile={{@disableMobile}}

    @enable={{@enable}}

    @enableTime={{@enableTime}}

    @enableSeconds={{@enableSeconds}}

    @formatDate={{@formatDate}}

    @hourIncrement={{@hourIncrement}}

    @inline={{@inline}}

    @maxDate={{@maxDate}}

    @minDate={{@minDate}}

    @locale={{@locale}}

    @minuteIncrement={{@minuteIncrement}}

    @mode={{@mode}}

    @nextArrow={{@nextArrow}}

    @noCalendar={{@noCalendar}}

    @onChange={{@onChange}}

    @onClose={{@onClose}}

    @onOpen={{@onOpen}}

    @onReady={{@onReady}}

    @parseDate={{@parseDate}}

    @position={{@position}}

    @positionElement={{@positionElement}}

    @prevArrow={{@prevArrow}}

    @shorthandCurrentMonth={{@shorthandCurrentMonth}}
    @showMonths={{@showMonths}}

    @time_24hr={{@time_24hr}}

    @weekNumbers={{@weekNumbers}}

    @wrap={{@wrap}}

    @monthSelectorType={{@monthSelectorType}}
    @static={{true}}
    placeholder={{@placeholder}}
    id={{@guid}}
    disabled={{@disabled}}
    class={{unless @classless 'tpk-datepicker-input'}}

    ...attributes
  />
</template>

export default TpkDatepickerInputComponent;
