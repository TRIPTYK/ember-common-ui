/* eslint-disable @typescript-eslint/ban-types */
import Component from '@glimmer/component';

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

interface TpkDatepickerInputComponentSignature {
  Args: {
    guid: string;
    classless?: boolean;
    disabled?: boolean;
    disabledDates?: Date[] | ((date: Date) => boolean);
    value?: string;
    onChange: (value: Date[], e: Event) => void;
  } & FlatpickerArgs;
  Element: HTMLInputElement;
}

export default class TpkDatepickerInputComponent extends Component<TpkDatepickerInputComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-datepicker/input': typeof TpkDatepickerInputComponent;
  }
}
