import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import type { BaseUIComponentArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import type { WithBoundArgs } from '@glint/template';
import TpkDatepickerNewInputComponent, {
  type TpkDatepickerNewInput,
} from './tpk-datepicker-new/input.gts';
import TpkDatepickerLabelComponent from './tpk-datepicker-new/label.gts';
import { hash } from '@ember/helper';
import IMask from 'imask';
import { action } from '@ember/object';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

export type TpkDatepickerSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    TpkDatepickerNewInput & {
      mask?: string;
    }
  >;
  Blocks: {
    default: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Input: any;
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
            TpkDatepickerNewInputComponent
            guid=this.guid
            disabled=@disabled
            value=@value
            useCurrent=@useCurrent
            multipleDates=@multipleDates
            multipleDatesSeparator=@multipleDatesSeparator
            range=@range
            stepping=@stepping
            promptTimeOnDateChange=@promptTimeOnDateChange
            allowInputToggle=@allowInputToggle
            todayButton=@todayButton
            clearButton=@clearButton
            closeButton=@closeButton
            showTime=@showTime
            showCalendar=@showCalendar
            showSecond=@showSecond
            keepOpen=@keepOpen
            locale=@locale
            format=@format
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
