import { type BaseValidationSignature, BaseValidationComponent } from './base.ts';
import TpkRadio from '@triptyk/ember-input/components/tpk-radio';
import type { WithBoundArgs } from '@glint/template';
export interface TpkValidationRadioGroupComponentSignature extends BaseValidationSignature {
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
                onChange: TpkValidationRadioGroupComponent['onChange'];
                errors: TpkValidationRadioGroupComponent['errors'];
                hasError: TpkValidationRadioGroupComponent['hasError'];
                firstError: TpkValidationRadioGroupComponent['firstError'];
                mandatory: TpkValidationRadioGroupComponent['mandatory'];
                selected?: string;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationRadioGroupComponent extends BaseValidationComponent<TpkValidationRadioGroupComponentSignature> {
    onChange(value: string): void;
    get selected(): string | undefined;
}
//# sourceMappingURL=tpk-validation-radio-group.d.ts.map