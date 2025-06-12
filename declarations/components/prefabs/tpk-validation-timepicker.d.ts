import { type TpkValidationDatepickerComponentSignature } from '../tpk-validation-datepicker.gts';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
export interface TpkValidationTimepickerPrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationDatepickerComponentSignature['Args'] & {
        onChange?: (value: Date[]) => void;
    }, 'value' | 'noCalendar' | 'enableTime' | 'mode' | 'multipleDatesSeparator' | 'promptTimeOnDateChange' | 'useCurrent' | 'todayButton' | 'closeButton' | 'keepOpen' | 'minDate' | 'maxDate' | 'daysOfWeekDisabled' | 'disabledDates' | 'viewMode'>;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationTimepickerPrefabComponent extends Component<TpkValidationTimepickerPrefabSignature> {
    mask: string;
    dateFormat: string;
    constructor(owner: unknown, args: TpkValidationTimepickerPrefabSignature['Args']);
}
//# sourceMappingURL=tpk-validation-timepicker.d.ts.map