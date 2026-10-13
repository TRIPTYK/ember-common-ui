import { type TpkValidationCheckboxSignature } from '../tpk-validation-checkbox';
import { type BaseValidationSignature } from '../base.ts';
import { type TOC } from '@ember/component/template-only';
export interface TpkValidationCheckboxPrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkValidationCheckboxSignature['Args'];
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
declare const TpkValidationCheckboxPrefab: TOC<TpkValidationCheckboxPrefabSignature>;
export default TpkValidationCheckboxPrefab;
//# sourceMappingURL=tpk-validation-checkbox.d.ts.map