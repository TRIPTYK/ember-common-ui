import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { type Select } from 'ember-power-select/components/power-select';
import TpkSelectOption from './tpk-select/option.gts';
import type { TpkSelectSignature } from './tpk-select';
export interface TpkSelectCreateSignature {
    Args: TpkSelectSignature['Args'] & {
        multiple?: boolean;
        options: unknown[];
        selected?: unknown;
        label: string;
        placeholder?: string;
        renderInPlace?: boolean;
        allowClear?: boolean;
        disabled?: boolean;
        initiallyOpened?: boolean;
        loadingMessage?: string;
        selectedItemComponent?: string | ComponentLike<unknown>;
        placeholderComponent?: string | ComponentLike<unknown>;
        searchEnabled?: boolean;
        searchField?: string;
        searchPlaceholder?: string;
        searchMessage?: string;
        noMatchesMessage?: string;
        search?: ((term: string, select: Select) => readonly unknown[] | Promise<readonly unknown[]>) | undefined;
        onChange: (selection: unknown, select: Select, event?: Event) => void;
        onCreate: (selection: unknown, select: Select, event?: Event) => void;
        buildSuggestion?: (term: string) => string;
        showCreateWhen?: (term: string) => boolean;
        onKeyDown?: ((select: Select, e: KeyboardEvent) => boolean | undefined) | undefined;
    };
    Blocks: {
        default: [
            {
                Option: WithBoundArgs<typeof TpkSelectOption, 'option'>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class TpkSelectCreateComponent extends Component<TpkSelectCreateSignature> {
    guid: string;
    constructor(owner: unknown, args: TpkSelectCreateSignature['Args']);
    get renderInPlace(): boolean;
}
//# sourceMappingURL=tpk-select-create.d.ts.map