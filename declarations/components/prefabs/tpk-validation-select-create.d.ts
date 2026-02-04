import { type BaseValidationSignature, BaseValidationComponent } from '../base.ts';
import { type TpkSelectCreateSignature } from '@triptyk/ember-input/components/tpk-select-create';
import type Owner from '@ember/owner';
import type { SelectType } from '@triptyk/ember-input/components/tpk-select';
import type { Merge } from 'type-fest';
type Args = BaseValidationSignature['Args'] & Merge<TpkSelectCreateSignature['Args'], {
    onChange?: TpkSelectCreateSignature['Args']['onChange'];
}>;
export interface TpkValidationSelectCreatePrefabSignature extends BaseValidationSignature {
    Args: Args;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationSelectCreatePrefabComponent extends BaseValidationComponent<TpkValidationSelectCreatePrefabSignature> {
    constructor(owner: Owner, args: TpkValidationSelectCreatePrefabSignature['Args']);
    get label(): string;
    onChange(selection: unknown, select: SelectType, event?: Event): void;
    toString: (v: unknown) => string;
}
export {};
//# sourceMappingURL=tpk-validation-select-create.d.ts.map