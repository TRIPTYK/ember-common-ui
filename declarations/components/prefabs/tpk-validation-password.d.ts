import { type TpkValidationInputComponentSignature } from '../tpk-validation-input.gts';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
export interface TpkValidationPasswordPrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'unmaskValue' | 'maskOptions' | 'mask'>;
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationPasswordPrefabComponent extends Component<TpkValidationPasswordPrefabSignature> {
    showPassword: boolean;
    togglePassword(): void;
    get type(): "text" | "password";
}
//# sourceMappingURL=tpk-validation-password.d.ts.map