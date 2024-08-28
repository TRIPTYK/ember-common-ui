import Component from '@glimmer/component';
export interface TableGenericSearchBarComponentArgs {
    onChange?: (value: string, e: Event) => unknown;
    onSearch: (value: string, e: Event) => unknown;
}
export default class TableGenericSearchBarComponent extends Component<TableGenericSearchBarComponentArgs> {
    searchValue: string;
    constructor(owner: unknown, args: TableGenericSearchBarComponentArgs);
    updateSearchValue(v: string): void;
    onSearch(e: Event): void;
}
//# sourceMappingURL=search-bar.d.ts.map