import { BaseUIComponent, type BaseUIComponentArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import type { WithBoundArgs } from '@glint/template';
import TpkFileInputComponent from './tpk-file/input.gts';
import TpkLabel from './tpk-label.gts';
export type TpkFileSignature = {
    Args: MergeDeep<BaseUIComponentArgs['Args'], {
        accept?: string;
        multiple?: boolean;
        disabled?: boolean;
        onChange?: (value: File[], e: Event) => unknown;
    }>;
    Blocks: {
        default: [
            {
                Input: WithBoundArgs<typeof TpkFileInputComponent, 'onChange' | 'accept' | 'disabled' | 'changeEvent' | 'guid'>;
                Label: WithBoundArgs<typeof TpkLabel, 'label' | 'guid'>;
                guid: string;
                changeEvent: 'input' | 'change';
                onChange: TpkFileComponent['onChange'];
                files: TpkFileComponent['files'];
            }
        ];
    };
};
export default class TpkFileComponent extends BaseUIComponent<TpkFileSignature> {
    files: File[];
    onChange(e: Event): void;
}
//# sourceMappingURL=tpk-file.d.ts.map