import { type BaseValidationSignature } from '../base.ts';
import { type TpkValidationRadioComponentSignature } from '../tpk-validation-radio.gts';
import type { TOC } from '@ember/component/template-only';
export interface TpkValidationRadioPrefabComponentSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkValidationRadioComponentSignature['Args'] & {
        onChange?: (value: string) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
declare const TpkValidationRadioPrefabComponent: TOC<TpkValidationRadioPrefabComponentSignature>;
export default TpkValidationRadioPrefabComponent;
//# sourceMappingURL=tpk-validation-radio.d.ts.map