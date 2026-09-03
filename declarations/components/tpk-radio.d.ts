import { BaseUI, type BaseUIArgs } from './base.ts';
import type { WithBoundArgs } from '@glint/template';
import TpkRadioInputComponent from './tpk-radio/input';
import type { MergeDeep } from 'type-fest';
import TpkLabel from './tpk-label';
import type Owner from '@ember/owner';
export type TpkRadioSignature = {
    Args: MergeDeep<BaseUIArgs['Args'], {
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
                onChange: TpkRadio['onChange'];
                changeEvent: 'input' | 'change';
                guid: string;
            }
        ];
    };
};
export default class TpkRadio extends BaseUI<TpkRadioSignature> {
    constructor(owner: Owner, args: TpkRadioSignature['Args']);
    onChange(e: Event): void;
}
//# sourceMappingURL=tpk-radio.d.ts.map