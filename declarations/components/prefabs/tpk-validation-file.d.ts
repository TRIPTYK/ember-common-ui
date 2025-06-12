import { type BaseValidationSignature } from '../base.ts';
import { type TOC } from '@ember/component/template-only';
import { type TpkValidationFileComponentSignature } from '../tpk-validation-file.gts';
export interface TpkValidationFilePrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkValidationFileComponentSignature['Args'] & {
        mandatory?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
declare const TpkValidationFilePrefabComponent: TOC<TpkValidationFilePrefabSignature>;
export default TpkValidationFilePrefabComponent;
//# sourceMappingURL=tpk-validation-file.d.ts.map