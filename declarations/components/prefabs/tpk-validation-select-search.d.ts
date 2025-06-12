import { type BaseValidationSignature, BaseValidationComponent } from '../base.ts';
import type { TpkSelectSignature, Select } from '@triptyk/ember-input/components/tpk-select';
export interface TpkValidationSelectSearchPrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkSelectSignature['Args'] & {
        onChange?: (value: unknown, select: Select, event?: Event) => void;
        onSearch: (term: string) => unknown[];
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationSelectSearchPrefabComponent extends BaseValidationComponent<TpkValidationSelectSearchPrefabSignature> {
    constructor(owner: unknown, args: TpkValidationSelectSearchPrefabSignature['Args']);
    get label(): string;
    onChange(selection: unknown, select: Select, event?: Event): void;
    toString: (v: unknown) => string;
}
//# sourceMappingURL=tpk-validation-select-search.d.ts.map