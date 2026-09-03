import { type TpkValidationInputSignature } from '../tpk-validation-input';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
export interface TpkValidationNationalNumberPrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue'>;
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationNationalNumberPrefab extends Component<TpkValidationNationalNumberPrefabSignature> {
    mask: string;
}
//# sourceMappingURL=tpk-validation-national-number.d.ts.map