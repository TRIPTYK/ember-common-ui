import { BaseValidation, type BaseValidationSignature } from './base.ts';
import { type TpkTextareaSignature } from '@triptyk/ember-input/components/tpk-textarea';
export interface TpkValidationTextareaSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkTextareaSignature['Args'] & {
        onChange?: (value: string, e: Event) => void;
    };
    Blocks: {
        default: [
            {
                Label: TpkTextareaSignature['Blocks']['default'][0]['Label'];
                Input: TpkTextareaSignature['Blocks']['default'][0]['Input'];
                errors: TpkValidationTextarea['errors'];
                hasError: TpkValidationTextarea['hasError'];
                firstError: TpkValidationTextarea['firstError'];
                mandatory: TpkValidationTextarea['mandatory'];
                charCount: number;
            }
        ];
    };
}
export default class TpkValidationTextarea extends BaseValidation<TpkValidationTextareaSignature> {
    onChange(value: string, e: Event): unknown;
    get value(): string | undefined;
}
//# sourceMappingURL=tpk-validation-textarea.d.ts.map