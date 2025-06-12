import { type BaseValidationSignature, BaseValidationComponent } from './base.ts';
import type { TpkSelectSignature } from '@triptyk/ember-input/components/tpk-select';
import { type Select } from '@triptyk/ember-input/components/tpk-select';
export interface TpkValidationSelectComponentSignature {
    Args: BaseValidationSignature['Args'] & TpkSelectSignature['Args'] & {
        onChange?: (value: unknown, select: Select, event?: Event) => void;
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
export default class TpkValidationSelect extends BaseValidationComponent<TpkValidationSelectComponentSignature> {
    onChange(selection: unknown, select: Select, event?: Event): void;
    get label(): string;
}
//# sourceMappingURL=tpk-validation-select.d.ts.map