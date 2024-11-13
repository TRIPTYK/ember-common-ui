import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import type { BaseUIComponentArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import type { WithBoundArgs } from '@glint/template';
import TpkDatepickerNewInputComponent, {
  type TpkDatepickerInput,
  type TpkDatepickerInputComponentSignature,
} from './tpk-datepicker/input.gts';
import TpkDatepickerLabelComponent from './tpk-datepicker/label.gts';
import { hash } from '@ember/helper';
import IMask from 'imask';
import { action } from '@ember/object';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

export type TpkDatepickerSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    TpkDatepickerInput & {
      mask?: string;
    }
  >;
  Blocks: {
    default: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Input: WithBoundArgs<
          typeof TpkDatepickerNewInputComponent,
          keyof TpkDatepickerInputComponentSignature['Args']
        >;
        Label: WithBoundArgs<
          typeof TpkDatepickerLabelComponent,
          'guid'  | 'label'
        >;
        guid: string;
      },
    ];
  };
  Element: HTMLDivElement;
};

export default class TpkDatepicker extends Component<TpkDatepickerSignature> {
  guid = guidFor(this);

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
        },
        H: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 23,
          maxLength: 2,
        },
        M: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2,
        },
        S: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
          maxLength: 2,
        },
      },
      lazy: true,
      overwrite: true,
      autofix: true,
    });
  }

  <template>
    <div
      class='tpk-datepicker'
      {{didInsert this.setMask}}
      ...attributes
      data-test-tpk-datepicker
    >
      {{yield
        (hash
          Input=(component
            TpkDatepickerNewInputComponent
            guid=this.guid
            disabled=@disabled
            value=@value
            placeholder=@placeholder
            useCurrent=@useCurrent
            mode=@mode
            multipleDatesSeparator=@multipleDatesSeparator
            stepping=@stepping
            promptTimeOnDateChange=@promptTimeOnDateChange
            todayButton=@todayButton
            clearButton=@clearButton
            closeButton=@closeButton
            enableTime=@enableTime
            noCalendar=@noCalendar
            enableSecond=@enableSecond
            keepOpen=@keepOpen
            locale=@locale
            dateFormat=@dateFormat
            minDate=@minDate
            maxDate=@maxDate
            daysOfWeekDisabled=@daysOfWeekDisabled
            disabledTimeIntervals=@disabledTimeIntervals
            disabledDates=@disabledDates
            enabledDates=@enabledDates
            disabledHours=@disabledHours
            enabledHours=@enabledHours
            viewMode=@viewMode
            onChange=@onChange
            onClose=@onClose
          )
          Label=(component
            TpkDatepickerLabelComponent
            guid=this.guid
            label=@label
          )
          guid=this.guid
        )
      }}
    </div>
  </template>
}
