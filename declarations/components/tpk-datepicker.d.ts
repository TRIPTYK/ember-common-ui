import Component from '@glimmer/component';
import type { BaseUIComponentArgs } from './base.ts';
import type { WithBoundArgs } from '@glint/template';
import TpkDatepickerNewInputComponent, { type TpkDatepickerInputArgs } from './tpk-datepicker-input.gts';
import TpkLabel from './tpk-label.gts';
export type TpkDatepickerSignature = {
    Args: BaseUIComponentArgs['Args'] & TpkDatepickerInputArgs & {
        mask?: string;
    };
    Blocks: {
        default: [
            {
                Input: WithBoundArgs<typeof TpkDatepickerNewInputComponent, 'guid' | 'disabled' | 'value' | 'placeholder' | 'useCurrent' | 'mode' | 'multipleDatesSeparator' | 'stepping' | 'promptTimeOnDateChange' | 'todayButton' | 'clearButton' | 'closeButton' | 'enableTime' | 'noCalendar' | 'enableSecond' | 'keepOpen' | 'locale' | 'dateFormat' | 'minDate' | 'maxDate' | 'daysOfWeekDisabled' | 'disabledTimeIntervals' | 'disabledDates' | 'enabledDates' | 'disabledHours' | 'enabledHours' | 'viewMode' | 'onChange' | 'onClose'>;
                Label: WithBoundArgs<typeof TpkLabel, 'guid' | 'label'>;
                guid: string;
            }
        ];
    };
    Element: HTMLDivElement;
};
export default class TpkDatepicker extends Component<TpkDatepickerSignature> {
    guid: string;
}
//# sourceMappingURL=tpk-datepicker.d.ts.map