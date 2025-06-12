import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { type Select } from 'ember-power-select/components/power-select';
import TpkSelectOption from './tpk-select/option.gts';
export { type Select } from 'ember-power-select/components/power-select';
export interface TpkSelectSignature {
    Args: {
        multiple?: boolean;
        options: unknown[];
        selected?: unknown;
        label: string;
        placeholder?: string;
        renderInPlace?: boolean;
        labelClass?: string;
        allowClear?: boolean;
        disabled?: boolean;
        initiallyOpened?: boolean;
        loadingMessage?: string;
        labelComponent?: string | ComponentLike<unknown>;
        selectedItemComponent?: string | ComponentLike<unknown>;
        placeholderComponent?: string | ComponentLike<unknown>;
        searchEnabled?: boolean;
        searchField?: string;
        searchPlaceholder?: string;
        searchMessage?: string;
        noMatchesMessage?: string;
        search?: ((term: string, select: Select) => readonly unknown[] | Promise<readonly unknown[]>) | undefined;
        onChange: (selection: unknown, select: Select, event?: Event) => void;
        onKeyDown?: ((select: Select, e: KeyboardEvent) => boolean | undefined) | undefined;
    };
    Blocks: {
        default: [
            {
                Option: WithBoundArgs<typeof TpkSelectOption, 'option'>;
            }
        ];
    };
}
export default class TpkSelectComponent extends Component<TpkSelectSignature> {
    constructor(owner: unknown, args: TpkSelectSignature['Args']);
    get renderInPlace(): boolean;
}
//# sourceMappingURL=tpk-select.d.ts.map