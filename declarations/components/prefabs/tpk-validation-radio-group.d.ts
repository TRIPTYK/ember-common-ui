import type { TOC } from '@ember/component/template-only';
import type { BaseValidationSignature } from '../base';
import { type TpkValidationRadioGroupComponentSignature } from '../tpk-validation-radio-group.gts';
import TpkValidationRadioPrefabComponent from './tpk-validation-radio.gts';
import type { WithBoundArgs } from '@glint/template';
export interface TpkValidationRadioGroupPrefabComponentSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkValidationRadioGroupComponentSignature['Args'] & {
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
declare const TpkValidationRadioGroupPrefabComponent: TOC<TpkValidationRadioGroupPrefabComponentSignature>;
export default TpkValidationRadioGroupPrefabComponent;
//# sourceMappingURL=tpk-validation-radio-group.d.ts.map