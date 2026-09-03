import { BaseValidation, type BaseValidationSignature } from '../base.ts';
import { type TpkSelectSignature, type SelectType } from '@triptyk/ember-input/components/tpk-select';
import type Owner from '@ember/owner';
import type { Merge } from 'type-fest';
type Args = BaseValidationSignature['Args'] & Merge<TpkSelectSignature['Args'], {
    onChange?: (value: unknown, select: SelectType, event?: Event) => void;
}>;
export interface TpkValidationSelectPrefabSignature extends BaseValidationSignature {
    Args: Omit<Args, 'searchField' | 'searchPlaceholder' | 'searchMessage' | 'noMatchesMessage' | 'search'>;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationSelectPrefab extends BaseValidation<TpkValidationSelectPrefabSignature> {
    constructor(owner: Owner, args: TpkValidationSelectPrefabSignature['Args']);
    onChange(selection: unknown, select: SelectType, event?: Event): void;
    toString: (v: unknown) => string;
}
export {};
//# sourceMappingURL=tpk-validation-select.d.ts.map