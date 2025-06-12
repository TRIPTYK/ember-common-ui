import { type TpkValidationInputComponentSignature } from '../tpk-validation-input.gts';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
export interface TpkValidationIntegerComponentSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputComponentSignature['Args'], 'step' | 'unmaskValue' | 'maskOptions'> & {
        unsigned?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationIntegerComponent extends Component<TpkValidationIntegerComponentSignature> {
    get min(): number | undefined;
    preventNonNumericInput(event: KeyboardEvent): void;
}
//# sourceMappingURL=tpk-validation-integer.d.ts.map