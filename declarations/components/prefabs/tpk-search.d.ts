import type { MergeDeep } from 'type-fest';
import type { BaseUIArgs } from '../base';
import Component from '@glimmer/component';
export type TpkSearchPrefabSignature = {
    Args: MergeDeep<BaseUIArgs['Args'], {
        placeholder?: string;
        label?: string;
        onSearch: (e: Event, value: string) => unknown;
    }>;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
};
export default class TpkSearchPrefab extends Component<TpkSearchPrefabSignature> {
    performSearch: import("ember-concurrency").TaskForAsyncTaskFunction<this, (value: string, e: Event) => Promise<unknown>>;
    submitSearch: (e: Event) => void;
    get labelOrDefault(): string;
}
//# sourceMappingURL=tpk-search.d.ts.map