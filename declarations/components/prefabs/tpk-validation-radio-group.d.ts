import type { TOC } from '@ember/component/template-only';
import type { BaseValidationSignature } from '../base';
import { type TpkValidationRadioGroupSignature } from '../tpk-validation-radio-group';
import TpkValidationRadioPrefabComponent from './tpk-validation-radio';
import type { WithBoundArgs } from '@glint/template';
export interface TpkValidationRadioGroupPrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkValidationRadioGroupSignature['Args'] & {
        groupLabel: string;
        onChange?: (value: string) => void;
    };
    Blocks: {
        default: [
            WithBoundArgs<typeof TpkValidationRadioPrefabComponent, 'selected' | 'validationField' | 'changeset' | 'classless' | 'disabled'>
        ];
    };
    Element: HTMLElement;
}
declare const TpkValidationRadioGroupPrefab: TOC<TpkValidationRadioGroupPrefabSignature>;
export default TpkValidationRadioGroupPrefab;
//# sourceMappingURL=tpk-validation-radio-group.d.ts.map