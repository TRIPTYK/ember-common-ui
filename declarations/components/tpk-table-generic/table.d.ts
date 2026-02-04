import Component from '@glimmer/component';
import type { Store } from '@warp-drive/core';
import type { WithBoundArgs } from '@glint/template';
import TableGenericBodyComponent from './body';
import TableGenericHeaderComponent from './header';
import TableGenericFooterComponent from './footer';
export interface SortData {
    prop: string;
    direction: string;
}
export interface FilterData {
    filter: string;
    filterUsing?: string;
    columnFilters: {
        filter: string;
        fitlerUsing: string;
    }[];
}
export interface PaginationData {
    pageSize: number;
    pageNumber: number;
    pageStart: number;
    pageEnd: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    totalRows: number;
    totalPages: number;
}
export interface TableLoadDataApi {
    paginationData: PaginationData;
    sortData: SortData[];
    filterData: FilterData;
    filterRole: {
        filter: string;
    };
}
export interface TableApi {
    reloadData: () => void;
}
interface TableGenericTableArgs {
    entity: string;
    relationships?: string;
    pageSizes?: number[];
    pageSize?: number;
    filterText?: string;
    registerApi?: (api: TableApi) => unknown;
    rowClick?: (element?: unknown, e?: Event) => void;
    additionalFilters?: Record<string, string>;
    defaultSortColumn?: string;
}
export interface TableGenericTableSignature {
    Args: TableGenericTableArgs;
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                Body: WithBoundArgs<typeof TableGenericBodyComponent, 'table' | 'rowClick' | 'registerActionMenu'>;
                Header: WithBoundArgs<typeof TableGenericHeaderComponent, 'table' | 'hasActionMenu'>;
                Footer: WithBoundArgs<typeof TableGenericFooterComponent, 'table' | 'pageSizes' | 'hasActionMenu'>;
            }
        ];
    };
}
export default class TableGenericTableComponent extends Component<TableGenericTableSignature> {
    store: Store;
    totalRows?: number;
    get pageSize(): number;
    get relationships(): string | undefined;
    get additionalFilters(): Record<string, string>;
    registerApi(api: TableApi): void;
    loadData: (data: TableLoadDataApi) => Promise<import("@warp-drive/core/types/record").TypedRecordInstance[]>;
    private getSortString;
    hasActionMenu: boolean;
    registerActionMenu(): void;
    private buildQueryOptions;
}
export {};
//# sourceMappingURL=table.d.ts.map