import { type BaseValidationSignature, BaseValidationComponent } from './base.ts';
import { type TpkRadioSignature } from '@triptyk/ember-input/components/tpk-radio';
export interface TpkValidationRadioComponentSignature extends BaseValidationSignature {
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
                errors: TpkValidationRadioComponent['errors'];
                hasError: TpkValidationRadioComponent['hasError'];
                firstError: TpkValidationRadioComponent['firstError'];
            }
        ];
    };
}
export default class TpkValidationRadioComponent extends BaseValidationComponent<TpkValidationRadioComponentSignature> {
    onChange(value: string): void;
    get value(): string;
    get name(): string;
}
//# sourceMappingURL=tpk-validation-radio.d.ts.map