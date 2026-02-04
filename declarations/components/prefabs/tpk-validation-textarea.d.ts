import { type TpkValidationTextareaComponentSignature } from '../tpk-validation-textarea';
import { type BaseValidationSignature } from '../base.ts';
import { type TOC } from '@ember/component/template-only';
import type { Merge } from 'type-fest';
export interface TpkValidationTextareaPrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & Merge<TpkValidationTextareaComponentSignature['Args'], {
        mandatory?: boolean;
    }>;
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
declare const TpkValidationTextareaPrefabComponent: TOC<TpkValidationTextareaPrefabSignature>;
export default TpkValidationTextareaPrefabComponent;
//# sourceMappingURL=tpk-validation-textarea.d.ts.map