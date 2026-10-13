import { type BaseValidationSignature, BaseValidation } from './base.ts';
import TpkRadio from '@triptyk/ember-input/components/tpk-radio';
import type { WithBoundArgs } from '@glint/template';
export interface TpkValidationRadioGroupSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & {
        classless?: boolean;
        unmaskValue?: boolean;
        disabled?: boolean;
        mandatory?: boolean;
        onChange?: (value: string) => void;
    };
    Blocks: {
        default: [
            {
                Radio: WithBoundArgs<typeof TpkRadio, 'selected' | 'disabled' | 'name' | 'value' | 'onChange'>;
                onChange: TpkValidationRadioGroup['onChange'];
                errors: TpkValidationRadioGroup['errors'];
                hasError: TpkValidationRadioGroup['hasError'];
                firstError: TpkValidationRadioGroup['firstError'];
                mandatory: TpkValidationRadioGroup['mandatory'];
                selected?: string;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationRadioGroup extends BaseValidation<TpkValidationRadioGroupSignature> {
    onChange(value: string): void;
    get selected(): string | undefined;
}
//# sourceMappingURL=tpk-validation-radio-group.d.ts.map