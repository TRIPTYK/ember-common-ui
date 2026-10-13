import { type BaseValidationSignature } from '../base.ts';
import { type TOC } from '@ember/component/template-only';
import { type TpkValidationFileSignature } from '../tpk-validation-file';
export interface TpkValidationFilePrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkValidationFileSignature['Args'] & {
        mandatory?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
declare const TpkValidationFilePrefab: TOC<TpkValidationFilePrefabSignature>;
export default TpkValidationFilePrefab;
//# sourceMappingURL=tpk-validation-file.d.ts.map