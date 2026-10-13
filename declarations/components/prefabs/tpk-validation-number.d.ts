import { type TpkValidationInputSignature } from '../tpk-validation-input';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
export interface TpkValidationNumberSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputSignature['Args'], 'unmaskValue' | 'maskOptions'> & {
        unsigned?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationNumberPrefab extends Component<TpkValidationNumberSignature> {
    get min(): number | undefined;
}
//# sourceMappingURL=tpk-validation-number.d.ts.map