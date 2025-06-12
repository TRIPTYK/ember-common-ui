import { type BaseValidationSignature, BaseValidationComponent } from './base.ts';
import { type TpkDatepickerInputArgs } from '@triptyk/ember-input/components/tpk-datepicker-input';
import { type TpkDatepickerSignature } from '@triptyk/ember-input/components/tpk-datepicker';
export interface TpkValidationDatepickerComponentSignature extends BaseValidationSignature {
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
                errors: TpkValidationDatepickerComponent['errors'];
                hasError: TpkValidationDatepickerComponent['hasError'];
                firstError: TpkValidationDatepickerComponent['firstError'];
                mandatory: TpkValidationDatepickerComponent['mandatory'];
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationDatepickerComponent extends BaseValidationComponent<TpkValidationDatepickerComponentSignature> {
    onChange(dates: Date[]): void;
    get value(): string | Date | null;
}
//# sourceMappingURL=tpk-validation-datepicker.d.ts.map