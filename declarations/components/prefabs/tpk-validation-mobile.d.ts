import { type BaseValidationSignature, BaseValidation } from '../base.ts';
import type { TpkValidationInputSignature } from '../tpk-validation-input';
import type Owner from '@ember/owner';
import type { TOC } from '@ember/component/template-only';
export interface TpkValidationMobilePrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'unmaskValue' | 'maskOptions' | 'changeEvent' | 'onChange'>;
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
interface Prefix {
    flag: TOC<{
        Element: SVGSVGElement;
    }>;
    code: string;
}
export default class TpkValidationMobilePrefab extends BaseValidation<TpkValidationMobilePrefabSignature> {
    defaultPrefix: {
        flag: TOC<{
            Element: SVGSVGElement;
        }>;
        code: string;
    };
    selectedPrefix: {
        flag: TOC<{
            Element: SVGSVGElement;
        }>;
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
    getValueFromOption: (option: unknown, key: keyof Prefix) => string | TOC<{
        Element: SVGSVGElement;
    }>;
}
export {};
//# sourceMappingURL=tpk-validation-mobile.d.ts.map