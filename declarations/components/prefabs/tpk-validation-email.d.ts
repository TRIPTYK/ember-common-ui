import { type TpkValidationInputComponentSignature } from '../tpk-validation-input.gts';
import { type BaseValidationSignature } from '../base.ts';
import { type TOC } from '@ember/component/template-only';
export interface TpkValidationEmailComponentSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'unmaskValue' | 'maskOptions' | 'mask'>;
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
declare const TpkValidationEmailPrefabComponent: TOC<TpkValidationEmailComponentSignature>;
export default TpkValidationEmailPrefabComponent;
//# sourceMappingURL=tpk-validation-email.d.ts.map