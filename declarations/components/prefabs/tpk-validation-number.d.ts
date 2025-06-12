import { type TpkValidationInputComponentSignature } from '../tpk-validation-input.gts';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
export interface TpkValidationNumberComponentSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputComponentSignature['Args'], 'unmaskValue' | 'maskOptions'> & {
        unsigned?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationNumberPrefabComponent extends Component<TpkValidationNumberComponentSignature> {
    get min(): number | undefined;
}
//# sourceMappingURL=tpk-validation-number.d.ts.map