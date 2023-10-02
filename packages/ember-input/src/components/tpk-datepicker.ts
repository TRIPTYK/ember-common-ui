/* eslint-disable no-unused-vars */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { BaseUIComponentArgs } from './base';
import { MergeDeep } from 'type-fest';
import { ComponentLike } from '@glint/template';
import TpkDatepickerInputComponent, {
  FlatpickerArgs,
} from './tpk-datepicker/input';
import TpkDatepickerLabelComponent from './tpk-datepicker/label';

export type TpkDatepickerSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      disabled?: boolean;
      dateFormat?: string;
      altFormat?: string;
      altInput?: boolean;
      altInputClass?: string;
      allowInput?: boolean;
      allowInvalidPreload?: boolean;
      appendTo?: HTMLElement | string;
      ariaDateFormat?: string;
      conjuction?: string;
      clickOpens?: boolean;
      defaultDate?: Date | Date[];
      defaultHour?: number;
      defaultMinute?: number;
      disabledDate?: Date[] | ((date: Date) => boolean);
      disableMobile?: boolean;
      enable?: Date[] | ((date: Date) => boolean);
      enableTime?: boolean;
      classless?: boolean;
      enableSeconds?: boolean;
      formatDate?: string | ((date: Date, format: string) => string);
      hourIncrement?: number;
      inline?: boolean;
      maxDate?: Date | string;
      minDate?: Date | string;
      locale?: string | object;
      minuteIncrement?: number;
      mode?: string;
      nextArrow?: string;
      noCalendar?: boolean;
      onOpen?: () => void;
      onClose?: () => void;
      onReady?: () => void;
      parseDate?: string | ((date: string, format: string) => Date);
      position?: string;
      positionElement?: HTMLElement;
      prevArrow?: string;
      shorthandCurrentMonth?: boolean;
      showMonths?: number;
      time_24hr?: boolean;
      weekNumbers?: boolean;
      wrap?: boolean;
      monthSelectorType?: 'static' | 'dropdown';
    } & FlatpickerArgs
  >;
  Blocks: {
    default: [
      {
        Input: ComponentLike<TpkDatepickerInputComponent>;
        Label: ComponentLike<TpkDatepickerLabelComponent>;
        guid: string;
      },
    ];
  };
  Element: HTMLDivElement;
};

export default class TpkDatepicker extends Component<TpkDatepickerSignature> {
  guid = guidFor(this);

  get dateFormat() {
    return this.args.dateFormat ? this.args.dateFormat : 'd/m/Y';
  }

  get onClose() {
    return this.args.onClose ? this.args.onClose : this.args.onChange;
  }
}
