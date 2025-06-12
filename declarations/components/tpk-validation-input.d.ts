import { type BaseValidationSignature, BaseValidationComponent } from './base.ts';
import type { TpkInputSignature } from '@triptyk/ember-input/components/tpk-input';
export interface TpkValidationInputComponentSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkInputSignature['Args'] & {
        onChange?: (value: string | number | Date | null, e: Event) => void;
    };
    Blocks: {
        default: [
            {
                Input?: TpkInputSignature['Blocks']['default'][0]['Input'];
                Label?: TpkInputSignature['Blocks']['default'][0]['Label'];
                errors?: TpkValidationInputComponent['errors'];
                hasError: TpkValidationInputComponent['hasError'];
                firstError: TpkValidationInputComponent['firstError'];
                mandatory: TpkValidationInputComponent['mandatory'];
            }
        ];
    };
}
export default class TpkValidationInputComponent extends BaseValidationComponent<TpkValidationInputComponentSignature> {
    showPassword: boolean;
    onChange(value: string | number | Date | null, e: Event): unknown;
    get value(): string;
}
//# sourceMappingURL=tpk-validation-input.d.ts.map