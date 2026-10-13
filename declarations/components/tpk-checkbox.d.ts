import { BaseUI, type BaseUIArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import TpkCheckboxInputComponent from './tpk-checkbox-input';
import type { WithBoundArgs } from '@glint/template';
import TpkLabel from './tpk-label';
import type Owner from '@ember/owner';
export type TpkCheckboxSignature = {
    Args: MergeDeep<BaseUIArgs['Args'], {
        checked?: boolean;
        disabled?: boolean;
        onChange?: (isChecked: boolean, value: string, e: Event) => unknown;
    }>;
    Blocks: {
        default: [
            {
                Label: WithBoundArgs<typeof TpkLabel, 'guid' | 'label'>;
                Input: WithBoundArgs<typeof TpkCheckboxInputComponent, 'changeEvent' | 'onChange' | 'guid' | 'checked'>;
                onChange: TpkCheckbox['onChange'];
                changeEvent: 'input' | 'change';
                guid: string;
            }
        ];
    };
};
export default class TpkCheckbox extends BaseUI<TpkCheckboxSignature> {
    constructor(owner: Owner, args: TpkCheckboxSignature['Args']);
    onChange(e: Event): void;
}
//# sourceMappingURL=tpk-checkbox.d.ts.map