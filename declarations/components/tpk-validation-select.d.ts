import { type BaseValidationSignature, BaseValidation } from './base.ts';
import type { TpkSelectSignature } from '@triptyk/ember-input/components/tpk-select';
import { type SelectType } from '@triptyk/ember-input/components/tpk-select';
export interface TpkValidationSelectSignature {
    Args: BaseValidationSignature['Args'] & TpkSelectSignature['Args'] & {
        onChange?: (value: unknown, select: SelectType, event?: Event) => void;
    };
    Blocks: {
        default: [
            {
                Option: TpkSelectSignature['Blocks']['default'][0]['Option'];
                errors: TpkValidationSelect['errors'];
                hasError: TpkValidationSelect['hasError'];
                firstError: TpkValidationSelect['firstError'];
                mandatory: TpkValidationSelect['mandatory'];
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationSelect extends BaseValidation<TpkValidationSelectSignature> {
    onChange(selection: unknown, select: SelectType, event?: Event): void;
}
//# sourceMappingURL=tpk-validation-select.d.ts.map