import { type BaseValidationSignature, BaseValidation } from './base.ts';
import type { TpkInputSignature } from '@triptyk/ember-input/components/tpk-input';
export interface TpkValidationInputSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkInputSignature['Args'] & {
        onChange?: (value: string | number | Date | null, e: Event) => void;
    };
    Blocks: {
        default: [
            {
                Input?: TpkInputSignature['Blocks']['default'][0]['Input'];
                Label?: TpkInputSignature['Blocks']['default'][0]['Label'];
                errors?: TpkValidationInput['errors'];
                hasError: TpkValidationInput['hasError'];
                firstError: TpkValidationInput['firstError'];
                mandatory: TpkValidationInput['mandatory'];
            }
        ];
    };
}
export default class TpkValidationInput extends BaseValidation<TpkValidationInputSignature> {
    showPassword: boolean;
    onChange(value: string | number | Date | null, e: Event): unknown;
    get value(): string;
}
//# sourceMappingURL=tpk-validation-input.d.ts.map