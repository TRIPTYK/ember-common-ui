import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import { type TpkSelectSignature, type Select } from "@triptyk/ember-input/components/tpk-select";
export interface TpkValidationSelectPrefabSignature extends BaseValidationSignature {
    Args: Omit<BaseValidationSignature['Args'] & TpkSelectSignature['Args'] & {
        onChange?: (value: unknown, select: Select, event?: Event) => void;
    }, 'searchField' | 'searchPlaceholder' | 'searchMessage' | 'noMatchesMessage' | 'search'>;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class TpkValidationSelectPrefabComponent extends BaseValidationComponent<TpkValidationSelectPrefabSignature> {
    constructor(owner: unknown, args: TpkValidationSelectPrefabSignature['Args']);
    onChange(selection: unknown, select: Select, event?: Event): void;
    get label(): string;
    toString: (v: unknown) => string;
}
//# sourceMappingURL=tpk-validation-select.d.ts.map