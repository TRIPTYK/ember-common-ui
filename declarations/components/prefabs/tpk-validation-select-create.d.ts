import { type BaseValidationSignature, BaseValidationComponent } from '../base.ts';
import { type TpkSelectCreateSignature } from '@triptyk/ember-input/components/tpk-select-create';
import type { Select } from '@triptyk/ember-input/components/tpk-select';
export interface TpkValidationSelectCreatePrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkSelectCreateSignature['Args'] & {
        onChange?: TpkSelectCreateSignature['Args']['onChange'];
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationSelectCreatePrefabComponent extends BaseValidationComponent<TpkValidationSelectCreatePrefabSignature> {
    constructor(owner: unknown, args: TpkValidationSelectCreatePrefabSignature['Args']);
    get label(): string;
    onChange(selection: unknown, select: Select, event?: Event): void;
    toString: (v: unknown) => string;
}
//# sourceMappingURL=tpk-validation-select-create.d.ts.map