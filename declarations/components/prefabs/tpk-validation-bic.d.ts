import { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import Component from "@glimmer/component";
export interface TpkValidationBicPrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'> & {
        onChange?: (value: string, e: Event) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationBicPrefabComponent extends Component<TpkValidationBicPrefabSignature> {
    mask: string;
    maskOptions: {
        definitions: {
            '#': RegExp;
            '&': RegExp;
            $: RegExp;
        };
    };
    onChange(value: string | number | Date | null, e: Event): unknown;
}
//# sourceMappingURL=tpk-validation-bic.d.ts.map