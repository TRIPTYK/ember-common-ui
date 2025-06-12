import { type TpkValidationDatepickerComponentSignature } from '../tpk-validation-datepicker.gts';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
export interface TpkValidationDatepickerPrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationDatepickerComponentSignature['Args'], 'value' | 'useCurrent'> & {
        onChange?: (value: Date[]) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationDatepickerPrefabComponent extends Component<TpkValidationDatepickerPrefabSignature> {
    multipleDatesSeparator: string;
    constructor(owner: unknown, args: TpkValidationDatepickerPrefabSignature['Args']);
}
//# sourceMappingURL=tpk-validation-datepicker.d.ts.map