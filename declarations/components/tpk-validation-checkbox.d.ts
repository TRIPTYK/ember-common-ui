import { type BaseValidationSignature, BaseValidation } from './base.ts';
import type { TpkCheckboxSignature } from '@triptyk/ember-input/components/tpk-checkbox';
export interface TpkValidationCheckboxSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkCheckboxSignature['Args'] & {
        onChange?: (isChecked: boolean, value: string, e: Event) => void;
    };
    Blocks: {
        default: [
            {
                Input: TpkCheckboxSignature['Blocks']['default'][0]['Input'];
                Label: TpkCheckboxSignature['Blocks']['default'][0]['Label'];
                errors: TpkValidationCheckbox['errors'];
                hasError: TpkValidationCheckbox['hasError'];
                firstError: TpkValidationCheckbox['firstError'];
                mandatory: TpkValidationCheckbox['mandatory'];
            }
        ];
    };
}
export default class TpkValidationCheckbox extends BaseValidation<TpkValidationCheckboxSignature> {
    onChange(isChecked: boolean, value: string, e: Event): unknown;
    get value(): boolean;
}
//# sourceMappingURL=tpk-validation-checkbox.d.ts.map