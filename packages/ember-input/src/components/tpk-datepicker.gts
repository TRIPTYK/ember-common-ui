import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import type { BaseUIComponentArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import type { WithBoundArgs } from '@glint/template';
import TpkDatepickerInputComponent, {
  type FlatpickerArgs,
} from './tpk-datepicker/input.gts';
import TpkDatepickerLabelComponent from './tpk-datepicker/label.gts';
import { hash } from '@ember/helper';
import IMask, { type FactoryArg, InputMask } from 'imask';
import { action } from '@ember/object';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

type DatepickerOptionKey =
  | 'onChange'
  | 'onClose'
  | 'value'
  | 'guid'
  | 'disabled'
  | 'placeholder'
  | 'altFormat'
  | 'altInput'
  | 'altInputClass'
  | 'allowInput'
  | 'allowInvalidPreload'
  | 'appendTo'
  | 'ariaDateFormat'
  | 'conjunction'
  | 'clickOpens'
  | 'defaultDate'
  | 'defaultHour'
  | 'defaultMinute'
  | 'disabledDates'
  | 'disableMobile'
  | 'enable'
  | 'enableTime'
  | 'classless'
  | 'dateFormat'
  | 'enableSeconds'
  | 'formatDate'
  | 'hourIncrement'
  | 'inline'
  | 'maxDate'
  | 'minDate'
  | 'locale'
  | 'minuteIncrement'
  | 'mode'
  | 'nextArrow'
  | 'noCalendar'
  | 'onOpen'
  | 'onReady'
  | 'parseDate'
  | 'position'
  | 'positionElement'
  | 'prevArrow'
  | 'shorthandCurrentMonth'
  | 'showMonths'
  | 'time_24hr'
  | 'weekNumbers'
  | 'wrap'
  | 'monthSelectorType';

export type TpkDatepickerSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      value: Date[] | Date | string | string[] | null | number;
      onChange?: (value: Date[], e: Event) => void;
      disabled?: boolean;
      mask?: string;
    } & FlatpickerArgs
  >;
  Blocks: {
    default: [
      {
        Input: WithBoundArgs<
          typeof TpkDatepickerInputComponent,
          DatepickerOptionKey
        >;
        Label: WithBoundArgs<
          typeof TpkDatepickerLabelComponent,
          'guid' | 'classless' | 'label'
        >;
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

  @action
  setMask(element: HTMLElement) {
    if (!this.args.mask) return;

    const inputElement = element.querySelector(
      `input#${this.guid}`,
    ) as HTMLElement;

    IMask(inputElement, {
      mask: this.args.mask,
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 9999,
        }
      },
      lazy: true,
      overwrite: true,
      autofix: true,
    });
  }

  <template>
    <div
      class={{unless @classless 'tpk-datepicker'}}
      {{didInsert this.setMask}}
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
