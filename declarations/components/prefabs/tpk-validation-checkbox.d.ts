import { type TpkValidationCheckboxComponentSignature } from "../tpk-validation-checkbox.gts";
import { type BaseValidationSignature } from "../base.ts";
import { type TOC } from '@ember/component/template-only';
export interface TpkValidationCheckboxPrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkValidationCheckboxComponentSignature['Args'];
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
declare const TpkValidationCheckboxPrefabComponent: TOC<TpkValidationCheckboxPrefabSignature>;
export default TpkValidationCheckboxPrefabComponent;
//# sourceMappingURL=tpk-validation-checkbox.d.ts.map