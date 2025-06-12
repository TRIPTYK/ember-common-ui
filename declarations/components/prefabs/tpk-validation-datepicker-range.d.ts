import { type TpkValidationDatepickerComponentSignature } from '../tpk-validation-datepicker.gts';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
export interface TpkValidationDatepickerRangePrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationDatepickerComponentSignature['Args'], 'value' | 'promptTimeOnDateChange' | 'useCurrent' | 'noCalendar' | 'enableTime' | 'stepping' | 'enableSecond' | 'disabledTimeIntervals' | 'disabledHours' | 'enabledHours'> & {
        onChange?: (value: Date[]) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationDatepickerRangePrefabComponent extends Component<TpkValidationDatepickerRangePrefabSignature> {
    multipleDatesSeparator: string;
    constructor(owner: unknown, args: TpkValidationDatepickerRangePrefabSignature['Args']);
}
//# sourceMappingURL=tpk-validation-datepicker-range.d.ts.map