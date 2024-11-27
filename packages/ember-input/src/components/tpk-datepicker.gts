import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import type { BaseUIComponentArgs } from './base.ts';
import type { WithBoundArgs } from '@glint/template';
import TpkDatepickerNewInputComponent, {
  type TpkDatepickerInputArgs
} from './tpk-datepicker-input.gts';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.gts';

export type TpkDatepickerSignature = {
  Args: BaseUIComponentArgs['Args'] &
    TpkDatepickerInputArgs & {
      mask?: string;
    }
  ;
  Blocks: {
    default: [
      {
        Input: WithBoundArgs<
          typeof TpkDatepickerNewInputComponent,
          'guid' | 'disabled' | 'value' | 'placeholder' | 'useCurrent' | 'mode' | 'multipleDatesSeparator' | 'stepping' | 'promptTimeOnDateChange' | 'todayButton' | 'clearButton' | 'closeButton' | 'enableTime' | 'noCalendar' | 'enableSecond' | 'keepOpen' | 'locale' | 'dateFormat' | 'minDate' | 'maxDate' | 'daysOfWeekDisabled' | 'disabledTimeIntervals' | 'disabledDates' | 'enabledDates' | 'disabledHours' | 'enabledHours' | 'viewMode' | 'onChange' | 'onClose'
        >;
        Label: WithBoundArgs<
          typeof TpkLabel,
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

  <template>
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
          TpkLabel
          guid=this.guid
          label=@label
        )
        guid=this.guid
      )
    }}
  </template>
}
