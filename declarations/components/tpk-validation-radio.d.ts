import { type BaseValidationSignature, BaseValidation } from './base.ts';
import { type TpkRadioSignature } from '@triptyk/ember-input/components/tpk-radio';
export interface TpkValidationRadioSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & {
        label: string;
        classless?: boolean;
        name?: string;
        changeEvent?: 'input' | 'change';
        value: string;
        disabled?: boolean;
        onChange?: (value: string) => void;
        selected?: string;
    };
    Blocks: {
        default: [
            {
                Input: TpkRadioSignature['Blocks']['default'][0]['Input'];
                Label: TpkRadioSignature['Blocks']['default'][0]['Label'];
                errors: TpkValidationRadio['errors'];
                hasError: TpkValidationRadio['hasError'];
                firstError: TpkValidationRadio['firstError'];
            }
        ];
    };
}
export default class TpkValidationRadio extends BaseValidation<TpkValidationRadioSignature> {
    onChange(value: string): void;
    get value(): string;
    get name(): string;
}
//# sourceMappingURL=tpk-validation-radio.d.ts.map