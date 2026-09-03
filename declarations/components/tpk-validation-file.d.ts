import { BaseValidation, type BaseValidationSignature } from './base.ts';
import { type TpkFileSignature } from '@triptyk/ember-input/components/tpk-file';
export interface TpkValidationFileSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & {
        label: string;
        multiple?: boolean;
        disabled?: boolean;
        changeEvent?: 'input' | 'change';
        onChange?: (file: File[]) => void;
    };
    Blocks: {
        default: [
            {
                Input: TpkFileSignature['Blocks']['default'][0]['Input'];
                Label: TpkFileSignature['Blocks']['default'][0]['Label'];
                errors: TpkValidationFile['errors'];
                hasError: TpkValidationFile['hasError'];
                firstError: TpkValidationFile['firstError'];
            }
        ];
    };
}
export default class TpkValidationFile extends BaseValidation<TpkValidationFileSignature> {
    onChange(file: File[]): void;
}
//# sourceMappingURL=tpk-validation-file.d.ts.map