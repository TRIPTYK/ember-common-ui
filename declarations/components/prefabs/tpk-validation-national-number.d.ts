import { type TpkValidationInputComponentSignature } from "../tpk-validation-input.gts";
import { type BaseValidationSignature } from "../base.ts";
import Component from "@glimmer/component";
export interface TpkValidationNationalNumberPrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue' | 'mask'>;
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationNationalNumberPrefabComponent extends Component<TpkValidationNationalNumberPrefabSignature> {
    mask: string;
}
//# sourceMappingURL=tpk-validation-national-number.d.ts.map