import { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import { getMaskForPrefixOrDefault } from "../../utils/mask-utils.ts";
import Component from "@glimmer/component";
export interface TpkValidationIBANPrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'> & {
        mandatory?: boolean;
        onChange?: (value: string, e: Event) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationIBANPrefabComponent extends Component<TpkValidationIBANPrefabSignature> {
    ibanMaskByCountry: ({
        mask: string;
        startsWith: string;
        definitions: {
            '#': RegExp;
            '&': RegExp;
            $: RegExp;
        };
        lazy: boolean;
        default?: undefined;
    } | {
        mask: string;
        startsWith: string;
        default: boolean;
        definitions: {
            '#': RegExp;
            '&': RegExp;
            $: RegExp;
        };
        lazy: boolean;
    })[];
    maskOptions: {
        dispatch: typeof getMaskForPrefixOrDefault;
    };
    get hasMaskNotDisabled(): "" | ({
        mask: string;
        startsWith: string;
        definitions: {
            '#': RegExp;
            '&': RegExp;
            $: RegExp;
        };
        lazy: boolean;
        default?: undefined;
    } | {
        mask: string;
        startsWith: string;
        default: boolean;
        definitions: {
            '#': RegExp;
            '&': RegExp;
            $: RegExp;
        };
        lazy: boolean;
    })[];
    onChange(value: string | number | Date | null, e: Event): unknown;
}
//# sourceMappingURL=tpk-validation-iban.d.ts.map