import { type BaseValidationSignature, BaseValidationComponent } from '../base.ts';
import type { TpkSelectSignature, SelectType } from '@triptyk/ember-input/components/tpk-select';
import type Owner from '@ember/owner';
import type { Merge } from 'type-fest';
type Args = BaseValidationSignature['Args'] & Merge<TpkSelectSignature['Args'], {
    onChange?: (value: unknown, select: SelectType, event?: Event) => void;
    onSearch: TpkSelectSignature['Args']['search'];
}>;
export interface TpkValidationSelectSearchPrefabSignature extends BaseValidationSignature {
    Args: Args;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationSelectSearchPrefabComponent extends BaseValidationComponent<TpkValidationSelectSearchPrefabSignature> {
    constructor(owner: Owner, args: TpkValidationSelectSearchPrefabSignature['Args']);
    get label(): string;
    onChange(selection: unknown, select: SelectType, event?: Event): void;
    toString: (v: unknown) => string;
}
export {};
//# sourceMappingURL=tpk-validation-select-search.d.ts.map