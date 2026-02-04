import { type BaseValidationSignature, BaseValidationComponent } from '../base.ts';
import type { TpkValidationInputComponentSignature } from '../tpk-validation-input';
import type Owner from '@ember/owner';
export interface TpkValidationMobilePrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'unmaskValue' | 'maskOptions' | 'changeEvent' | 'onChange'>;
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
interface Prefix {
    flag: string;
    code: string;
}
export default class TpkValidationMobilePrefabComponent extends BaseValidationComponent<TpkValidationMobilePrefabSignature> {
    defaultPrefix: {
        flag: string;
        code: string;
    };
    selectedPrefix: {
        flag: string;
        code: string;
    };
    prefixes: Prefix[];
    constructor(owner: Owner, args: TpkValidationMobilePrefabSignature['Args']);
    get valueForMobileNumber(): string;
    get mask(): string;
    getPrefix(): Prefix;
    getValue(): string;
    onChangeValueMobile(value: string | number | Date | null): void;
    onChangeValuePrefix(value: unknown): void;
    getValueFromOption: (option: unknown, key: keyof Prefix) => string;
}
export {};
//# sourceMappingURL=tpk-validation-mobile.d.ts.map