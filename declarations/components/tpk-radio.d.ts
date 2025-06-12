import { BaseUIComponent, type BaseUIComponentArgs } from './base.ts';
import type { WithBoundArgs } from '@glint/template';
import TpkRadioInputComponent from './tpk-radio/input.gts';
import type { MergeDeep } from 'type-fest';
import TpkLabel from './tpk-label.gts';
export type TpkRadioSignature = {
    Args: MergeDeep<BaseUIComponentArgs['Args'], {
        value?: string;
        checked?: boolean;
        disabled?: boolean;
        name: string;
        selected?: string;
        onChange?: (value: string, e: Event) => unknown;
    }>;
    Blocks: {
        default: [
            {
                Label: WithBoundArgs<typeof TpkLabel, 'guid' | 'label'>;
                Input: WithBoundArgs<typeof TpkRadioInputComponent, 'guid' | 'selected' | 'disabled' | 'name' | 'value' | 'changeEvent' | 'onChange'>;
                onChange: TpkRadioComponent['onChange'];
                changeEvent: 'input' | 'change';
                guid: string;
            }
        ];
    };
};
export default class TpkRadioComponent extends BaseUIComponent<TpkRadioSignature> {
    constructor(owner: unknown, args: TpkRadioSignature['Args']);
    onChange(e: Event): void;
}
//# sourceMappingURL=tpk-radio.d.ts.map