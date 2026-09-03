import { type BaseValidationSignature, BaseValidation } from './base.ts';
import { type TpkDatepickerInputArgs } from '@triptyk/ember-input/components/tpk-datepicker-input';
import { type TpkDatepickerSignature } from '@triptyk/ember-input/components/tpk-datepicker';
export interface TpkValidationDatepickerSignature extends BaseValidationSignature {
    Args: Omit<BaseValidationSignature['Args'] & {
        label: string;
        disabled?: boolean;
        mask?: string;
        onChange?: (value: Date[]) => void;
    } & TpkDatepickerInputArgs, 'value'>;
    Blocks: {
        default: [
            {
                Input: TpkDatepickerSignature['Blocks']['default'][0]['Input'];
                Label: TpkDatepickerSignature['Blocks']['default'][0]['Label'];
                errors: TpkValidationDatepicker['errors'];
                hasError: TpkValidationDatepicker['hasError'];
                firstError: TpkValidationDatepicker['firstError'];
                mandatory: TpkValidationDatepicker['mandatory'];
            }
        ];
    };
    Element: HTMLDivElement & {
        anchorScrollUp: string;
    };
}
export default class TpkValidationDatepicker extends BaseValidation<TpkValidationDatepickerSignature> {
    onChange(dates: Date[]): void;
    get value(): string | Date | [Date, Date] | null;
}
//# sourceMappingURL=tpk-validation-datepicker.d.ts.map