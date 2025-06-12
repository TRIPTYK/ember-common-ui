import { BaseValidationComponent, type BaseValidationSignature } from './base.ts';
import { type TpkTextareaSignature } from '@triptyk/ember-input/components/tpk-textarea';
export interface TpkValidationTextareaComponentSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkTextareaSignature['Args'] & {
        onChange?: (value: string, e: Event) => void;
    };
    Blocks: {
        default: [
            {
                Label: TpkTextareaSignature['Blocks']['default'][0]['Label'];
                Input: TpkTextareaSignature['Blocks']['default'][0]['Input'];
                errors: TpkValidationTextareaComponent['errors'];
                hasError: TpkValidationTextareaComponent['hasError'];
                firstError: TpkValidationTextareaComponent['firstError'];
                mandatory: TpkValidationTextareaComponent['mandatory'];
                charCount: number;
            }
        ];
    };
}
export default class TpkValidationTextareaComponent extends BaseValidationComponent<TpkValidationTextareaComponentSignature> {
    onChange(value: string, e: Event): unknown;
    get value(): string | undefined;
}
//# sourceMappingURL=tpk-validation-textarea.d.ts.map