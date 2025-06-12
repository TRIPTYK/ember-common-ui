import { BaseUIComponent, type BaseUIComponentArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import TpkCheckboxInputComponent from './tpk-checkbox-input.gts';
import type { WithBoundArgs } from '@glint/template';
import TpkLabel from './tpk-label.gts';
export type TpkCheckboxSignature = {
    Args: MergeDeep<BaseUIComponentArgs['Args'], {
        checked?: boolean;
        disabled?: boolean;
        onChange?: (isChecked: boolean, value: string, e: Event) => unknown;
    }>;
    Blocks: {
        default: [
            {
                Label: WithBoundArgs<typeof TpkLabel, 'guid' | 'label'>;
                Input: WithBoundArgs<typeof TpkCheckboxInputComponent, 'changeEvent' | 'onChange' | 'guid' | 'checked'>;
                onChange: TpkCheckboxComponent['onChange'];
                changeEvent: 'input' | 'change';
                guid: string;
            }
        ];
    };
};
export default class TpkCheckboxComponent extends BaseUIComponent<TpkCheckboxSignature> {
    constructor(owner: unknown, args: TpkCheckboxSignature['Args']);
    onChange(e: Event): void;
}
//# sourceMappingURL=tpk-checkbox.d.ts.map