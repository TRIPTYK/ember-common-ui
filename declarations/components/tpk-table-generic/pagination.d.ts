import Component from '@glimmer/component';
export interface TableGenericPaginationData {
    isFirstPage: boolean;
    isLastPage: boolean;
    totalRows: number;
    pageStart: number;
    pageEnd: number;
    pageSize: number;
}
export interface TableGenericTheme {
    pagination: {
        controls: string;
        previous: string;
        previousPage: string;
        next: string;
        info: string;
        pageSize: string;
    };
}
export interface TableGenericPaginationActions {
    changePageSize: (value: string) => void;
    previousPage: () => void;
    nextPage: () => void;
    goToPage: (page: number) => void;
}
interface PaginationArgs {
    pageSizes?: number[];
    disabled: boolean;
    theme: TableGenericTheme;
    paginationData: TableGenericPaginationData;
    paginationActions: TableGenericPaginationActions;
}
export interface PaginationComponentSignature {
    Args: PaginationArgs;
    Element: HTMLDivElement;
}
export default class TableGenericPaginationComponent extends Component<PaginationComponentSignature> {
    isPageSizeSelected: (pageSize: number) => boolean;
    get pageSizes(): number[];
    get hasRows(): boolean;
    get shouldDisablePrevious(): boolean;
    get shouldDisableNext(): boolean;
    changePageSize(ev: Event): void;
}
export {};
//# sourceMappingURL=pagination.d.ts.map