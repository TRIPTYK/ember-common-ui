import { BaseUIComponent, type BaseUIComponentArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import TpkInputInputComponent from './tpk-input/input.gts';
import type { WithBoundArgs } from '@glint/template';
import TpkLabel from './tpk-label.gts';
export type TpkInputSignature = {
    Args: MergeDeep<BaseUIComponentArgs['Args'], {
        value?: string | number | boolean | null | undefined;
        type?: HTMLInputElement['type'];
        mask?: unknown;
        min?: number;
        step?: number;
        max?: number;
        placeholder?: string;
        disabled?: boolean;
        maskOptions?: Record<string, unknown>;
        unmaskValue?: boolean;
        onChange?: (value: string | number | Date | null, e: Event) => unknown;
    }>;
    Blocks: {
        default: [
            {
                Input: WithBoundArgs<typeof TpkInputInputComponent, 'value' | 'onChange' | 'type' | 'changeEvent' | 'disabled' | 'guid' | 'min' | 'step' | 'max'>;
                Label: WithBoundArgs<typeof TpkLabel, 'label' | 'guid'>;
                changeEvent: 'input' | 'change';
                guid: string;
            }
        ];
    };
};
export default class TpkInputComponent extends BaseUIComponent<TpkInputSignature> {
    constructor(owner: unknown, args: TpkInputSignature['Args']);
}
//# sourceMappingURL=tpk-input.d.ts.map