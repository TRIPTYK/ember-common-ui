import { type TpkValidationInputSignature } from '../tpk-validation-input';
import { type BaseValidationSignature } from '../base.ts';
import { type TOC } from '@ember/component/template-only';
export interface TpkValidationEmailSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'unmaskValue' | 'maskOptions'>;
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
declare const TpkValidationEmailPrefab: TOC<TpkValidationEmailSignature>;
export default TpkValidationEmailPrefab;
//# sourceMappingURL=tpk-validation-email.d.ts.map