import { type BaseValidationSignature } from '../base.ts';
import { type TpkValidationRadioSignature } from '../tpk-validation-radio';
import type { TOC } from '@ember/component/template-only';
export interface TpkValidationRadioPrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkValidationRadioSignature['Args'] & {
        onChange?: (value: string) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
declare const TpkValidationRadioPrefab: TOC<TpkValidationRadioPrefabSignature>;
export default TpkValidationRadioPrefab;
//# sourceMappingURL=tpk-validation-radio.d.ts.map