import { TOC } from '@ember/component/template-only';
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
  onClose?: Function;
  onOpen?: Function;
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

// Lot of @glint-expect-error. I do not want to loose all the type safety.
// waiting on ember-flatpickr to be updated to a type safe version.
const TpkDatepickerInputComponent: TOC<TpkDatepickerInputComponentSignature> = <template>
  {{!-- @glint-expect-error --}}
  <EmberFlatpickr
    data-test-tpk-datepicker-content
    {{!-- @glint-expect-error --}}
    @altFormat={{@altFormat}}
    {{!-- @glint-expect-error --}}
    @altInput={{@altInput}}
    {{!-- @glint-expect-error --}}
    @altInputClass={{@altInputClass}}
    {{!-- @glint-expect-error --}}
    @allowInput={{@allowInput}}
    {{!-- @glint-expect-error --}}
    @allowInvalidPreload={{@allowInvalidPreload}}
    {{!-- @glint-expect-error --}}
    @appendTo={{@appendTo}}
    {{!-- @glint-expect-error --}}
    @ariaDateFormat={{@ariaDateFormat}}
    {{!-- @glint-expect-error --}}
    @conjunction={{@conjunction}}
    {{!-- @glint-expect-error --}}
    @clickOpens={{@clickOpens}}
    @date={{@value}}
    {{!-- @glint-expect-error --}}
    @dateFormat={{@dateFormat}}
    {{!-- @glint-expect-error --}}
    @defaultDate={{@defaultDate}}
    {{!-- @glint-expect-error --}}
    @defaultHour={{@defaultHour}}
    {{!-- @glint-expect-error --}}
    @defaultMinute={{@defaultMinute}}
    {{!-- @glint-expect-error --}}
    @disable={{@disabledDates}}
    {{!-- @glint-expect-error --}}
    @disableMobile={{@disableMobile}}
    {{!-- @glint-expect-error --}}
    @enable={{@enable}}
    {{!-- @glint-expect-error --}}
    @enableTime={{@enableTime}}
    {{!-- @glint-expect-error --}}
    @enableSeconds={{@enableSeconds}}
    {{!-- @glint-expect-error --}}
    @formatDate={{@formatDate}}
    {{!-- @glint-expect-error --}}
    @hourIncrement={{@hourIncrement}}
    {{!-- @glint-expect-error --}}
    @inline={{@inline}}
    {{!-- @glint-expect-error --}}
    @maxDate={{@maxDate}}
    {{!-- @glint-expect-error --}}
    @minDate={{@minDate}}
    {{!-- @glint-expect-error --}}
    @locale={{@locale}}
    {{!-- @glint-expect-error --}}
    @minuteIncrement={{@minuteIncrement}}
    {{!-- @glint-expect-error --}}
    @mode={{@mode}}
    {{!-- @glint-expect-error --}}
    @nextArrow={{@nextArrow}}
    {{!-- @glint-expect-error --}}
    @noCalendar={{@noCalendar}}
    {{!-- @glint-expect-error --}}
    @onChange={{@onChange}}
    {{!-- @glint-expect-error --}}
    @onClose={{@onClose}}
    {{!-- @glint-expect-error --}}
    @onOpen={{@onOpen}}
    {{!-- @glint-expect-error --}}
    @onReady={{@onReady}}
    {{!-- @glint-expect-error --}}
    @parseDate={{@parseDate}}
    {{!-- @glint-expect-error --}}
    @position={{@position}}
    {{!-- @glint-expect-error --}}
    @positionElement={{@positionElement}}
    {{!-- @glint-expect-error --}}
    @prevArrow={{@prevArrow}}
    {{!-- @glint-expect-error --}}
    @shorthandCurrentMonth={{@shorthandCurrentMonth}}
    @showMonths={{@showMonths}}
    {{!-- @glint-expect-error --}}
    @time_24hr={{@time_24hr}}
    {{!-- @glint-expect-error --}}
    @weekNumbers={{@weekNumbers}}
    {{!-- @glint-expect-error --}}
    @wrap={{@wrap}}
    {{!-- @glint-expect-error --}}
    @monthSelectorType={{@monthSelectorType}}
    @static={{true}}
    placeholder={{@placeholder}}
    id={{@guid}}
    disabled={{@disabled}}
    class={{unless @classless 'tpk-datepicker-input'}}
    {{!-- @glint-expect-error --}}
    ...attributes
  />
</template>

export default TpkDatepickerInputComponent;
