import { type TpkValidationDatepickerComponentSignature } from '../tpk-validation-datepicker';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
import type Owner from '@ember/owner';
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
    constructor(owner: Owner, args: TpkValidationDatepickerPrefabSignature['Args']);
}
//# sourceMappingURL=tpk-validation-datepicker.d.ts.map