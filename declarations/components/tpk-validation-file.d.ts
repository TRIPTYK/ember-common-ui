import { BaseValidationComponent, type BaseValidationSignature } from './base.ts';
import { type TpkFileSignature } from '@triptyk/ember-input/components/tpk-file';
export interface TpkValidationFileComponentSignature extends BaseValidationSignature {
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
                errors: TpkValidationFileComponent['errors'];
                hasError: TpkValidationFileComponent['hasError'];
                firstError: TpkValidationFileComponent['firstError'];
            }
        ];
    };
}
export default class TpkValidationFileComponent extends BaseValidationComponent<TpkValidationFileComponentSignature> {
    onChange(file: File[]): void;
}
//# sourceMappingURL=tpk-validation-file.d.ts.map