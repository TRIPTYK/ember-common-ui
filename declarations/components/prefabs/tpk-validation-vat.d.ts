import { type TpkValidationInputSignature } from '../tpk-validation-input';
import { type BaseValidationSignature } from '../base.ts';
import { getMaskForPrefixOrDefault } from '../../utils/mask-utils.ts';
import Component from '@glimmer/component';
export interface TpkValidationVATPrefabSignature extends BaseValidationSignature {
    Args: Omit<TpkValidationInputSignature['Args'], 'type' | 'min' | 'max' | 'step' | 'mask' | 'maskOptions' | 'unmaskValue'> & {
        mandatory?: boolean;
        onChange?: (value: string, e: Event) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationVATPrefab extends Component<TpkValidationVATPrefabSignature> {
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
        lazy?: undefined;
    })[];
    maskOptions: {
        dispatch: typeof getMaskForPrefixOrDefault;
    };
    onChange(value: string | number | Date | null, e: Event): unknown;
}
//# sourceMappingURL=tpk-validation-vat.d.ts.map