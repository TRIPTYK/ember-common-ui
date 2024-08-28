import Component from '@glimmer/component';
interface PaginationArgs {
    pageSizes?: number[];
    disabled: boolean;
    paginationData: {
        isFirstPage: boolean;
        isLastPage: boolean;
    };
    paginationActions: {
        changePageSize: (value: string) => {};
    };
}
declare class Pagination extends Component<PaginationArgs> {
    /**
     * Array of page sizes to populate the page size `<select>`.
     * Particularly useful with an array helper, e.g `@pageSize={{array 10 12 23 50 100}}`
     * Defaults to `[50, 60, 70, 80, 90, 100]`.
     */
    get pageSizes(): number[];
    get shouldDisablePrevious(): boolean;
    get shouldDisableNext(): boolean;
    changePageSize(ev: Event): void;
}
export default Pagination;
//# sourceMappingURL=pagination.d.ts.map