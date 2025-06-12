import { BaseUIComponent, type BaseUIComponentArgs, type HtmlInputEvent } from './base.ts';
import type { MergeDeep } from 'type-fest';
import TpkTextareaInputComponent from './tpk-textarea/input.gts';
import type { WithBoundArgs } from '@glint/template';
import TpkLabel from './tpk-label.gts';
export type TpkTextareaSignature = {
    Args: MergeDeep<BaseUIComponentArgs['Args'], {
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        onChange?: (value: string, e: Event) => unknown;
        maxLength?: number;
    }>;
    Blocks: {
        default: [
            {
                Input: WithBoundArgs<typeof TpkTextareaInputComponent, 'guid' | 'value' | 'changeEvent' | 'disabled' | 'onChange' | 'placeholder' | 'updateCharacterCount' | 'setupCharacterCount' | 'maxLength'>;
                Label: WithBoundArgs<typeof TpkLabel, 'guid' | 'label'>;
                changeEvent: 'input' | 'change';
                onChange: (value: HtmlInputEvent, event: Event) => void;
                guid: string;
                charCount: number;
                maxLength?: number;
            }
        ];
    };
};
export default class TpkTextareaComponent extends BaseUIComponent<TpkTextareaSignature> {
    charCount: number;
    constructor(owner: unknown, args: TpkTextareaSignature['Args']);
    onChange(e: Event): void;
    updateCharacterCount(e: Event): void;
    setupCharacterCount(e: HTMLTextAreaElement): void;
}
//# sourceMappingURL=tpk-textarea.d.ts.map