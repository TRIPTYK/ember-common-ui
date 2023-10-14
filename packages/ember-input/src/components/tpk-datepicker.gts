import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { type BaseUIComponentArgs } from './base';
import { type MergeDeep } from 'type-fest';
import type { ComponentLike } from '@glint/template';
import TpkDatepickerInputComponent, {
  type FlatpickerArgs,
} from './tpk-datepicker/input';
import TpkDatepickerLabelComponent from './tpk-datepicker/label.gts';
import { hash } from '@ember/helper';

export type TpkDatepickerSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      value?: Date[] | Date | string | string[];
      onChange?: (value: Date[], e: Event) => void;
      disabled?: boolean;
    } & FlatpickerArgs
  >;
  Blocks: {
    default: [
      {
        Input: ComponentLike<typeof TpkDatepickerInputComponent>;
        Label: ComponentLike<typeof TpkDatepickerLabelComponent>;
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

  <template>
    <div
      class={{unless @classless 'tpk-datepicker'}}
      ...attributes
      data-test-tpk-datepicker
    >
      {{yield
        (hash
          Input=(component
            TpkDatepickerInputComponent
            onChange=@onChange
            onClose=this.onClose
            value=@value
            guid=this.guid
            disabled=@disabled
            placeholder=@placeholder
            altFormat=@altFormat
            altInput=@altInput
            altInputClass=@altInputClass
            allowInput=@allowInput
            allowInvalidPreload=@allowInvalidPreload
            appendTo=@appendTo
            ariaDateFormat=@ariaDateFormat
            conjunction=@conjunction
            clickOpens=@clickOpens
            defaultDate=@defaultDate
            defaultHour=@defaultHour
            defaultMinute=@defaultMinute
            disabledDates=@disabledDates
            disableMobile=@disableMobile
            enable=@enable
            enableTime=@enableTime
            classless=@classless
            dateFormat=this.dateFormat
            enableSeconds=@enableSeconds
            formatDate=@formatDate
            hourIncrement=@hourIncrement
            inline=@inline
            maxDate=@maxDate
            minDate=@minDate
            locale=@locale
            minuteIncrement=@minuteIncrement
            mode=@mode
            nextArrow=@nextArrow
            noCalendar=@noCalendar
            onOpen=@onOpen
            onReady=@onReady
            parseDate=@parseDate
            position=@position
            positionElement=@positionElement
            prevArrow=@prevArrow
            shorthandCurrentMonth=@shorthandCurrentMonth
            showMonths=@showMonths
            time_24hr=@time_24hr
            weekNumbers=@weekNumbers
            wrap=@wrap
            monthSelectorType=@monthSelectorType
          )
          Label=(component
            TpkDatepickerLabelComponent
            guid=this.guid
            classless=@classless
            label=@label
          )
          guid=this.guid
        )
      }}
    </div>
  </template>
}
