import { BaseUI, type BaseUIArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import type { WithBoundArgs } from '@glint/template';
import TpkFileInputComponent from './tpk-file/input';
import TpkLabel from './tpk-label';
export type TpkFileSignature = {
    Args: MergeDeep<BaseUIArgs['Args'], {
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
                onChange: TpkFile['onChange'];
                files: TpkFile['files'];
            }
        ];
    };
};
export default class TpkFile extends BaseUI<TpkFileSignature> {
    files: File[];
    onChange(e: Event): void;
}
//# sourceMappingURL=tpk-file.d.ts.map