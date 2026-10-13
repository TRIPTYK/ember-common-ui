import { type TpkValidationInputSignature } from '../tpk-validation-input';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
export interface TpkValidationIntegerSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputSignature['Args'], 'step' | 'unmaskValue' | 'maskOptions'> & {
        unsigned?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationInteger extends Component<TpkValidationIntegerSignature> {
    get min(): number | undefined;
    preventNonNumericInput(event: KeyboardEvent): void;
}
//# sourceMappingURL=tpk-validation-integer.d.ts.map