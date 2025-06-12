import { type BaseValidationSignature, BaseValidationComponent } from './base.ts';
import type { TpkCheckboxSignature } from '@triptyk/ember-input/components/tpk-checkbox';
export interface TpkValidationCheckboxComponentSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkCheckboxSignature['Args'] & {
        onChange?: (isChecked: boolean, value: string, e: Event) => void;
    };
    Blocks: {
        default: [
            {
                Input: TpkCheckboxSignature['Blocks']['default'][0]['Input'];
                Label: TpkCheckboxSignature['Blocks']['default'][0]['Label'];
                errors: TpkValidationCheckboxComponent['errors'];
                hasError: TpkValidationCheckboxComponent['hasError'];
                firstError: TpkValidationCheckboxComponent['firstError'];
                mandatory: TpkValidationCheckboxComponent['mandatory'];
            }
        ];
    };
}
export default class TpkValidationCheckboxComponent extends BaseValidationComponent<TpkValidationCheckboxComponentSignature> {
    onChange(isChecked: boolean, value: string, e: Event): unknown;
    get value(): boolean;
}
//# sourceMappingURL=tpk-validation-checkbox.d.ts.map