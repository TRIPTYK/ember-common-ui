import { type TpkValidationInputComponentSignature } from '../tpk-validation-input.gts';
import { type BaseValidationSignature } from '../base.ts';
import Component from '@glimmer/component';
export interface TpkValidationCurrencyPrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputComponentSignature['Args'], 'type' | 'mask' | 'unmaskValue' | 'maskOptions' | 'mask' | 'mix' | 'max' | 'step'> & {
        scale?: number;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationCurrencyPrefabComponent extends Component<TpkValidationCurrencyPrefabSignature> {
    get mask(): {
        mask: string;
        lazy: boolean;
        blocks: {
            num: {
                expose: boolean;
                mask: NumberConstructor;
                scale: number;
                thousandsSeparator: string;
                padFractionalZeros: boolean;
                radix: string;
                mapToRadix: string[];
            };
        };
    };
}
//# sourceMappingURL=tpk-validation-currency.d.ts.map