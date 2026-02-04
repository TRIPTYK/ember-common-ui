import Component from '@glimmer/component';
import type Owner from '@ember/owner';
export interface TableGenericSearchBarComponentArgs {
    onChange?: (value: string, e: Event) => unknown;
    onSearch: (value: string) => unknown;
    label: string;
    placeholder: string;
    inputClass?: string;
    disabled?: boolean;
}
export interface TableGenericSearchBarComponentSignature {
    Args: TableGenericSearchBarComponentArgs;
    Element: HTMLDivElement;
}
export default class TableGenericSearchBarComponent extends Component<TableGenericSearchBarComponentSignature> {
    searchValue: string;
    constructor(owner: Owner, args: TableGenericSearchBarComponentArgs);
    onSearch(e: Event, value: string): void;
}
//# sourceMappingURL=search-bar.d.ts.map