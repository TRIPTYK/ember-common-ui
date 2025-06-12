import Component from '@glimmer/component';
import type Store from '@ember-data/store';
import type ModelRegistry from 'ember-data/types/registries/model';
import type { WithBoundArgs } from '@glint/template';
import TableGenericBodyComponent from './body.gts';
import TableGenericHeaderComponent from './header.gts';
import TableGenericFooterComponent from './footer.gts';
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
    additionalFilters?: Record<string, unknown>;
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
export default class TableGenericTableComponent<K extends keyof ModelRegistry> extends Component<TableGenericTableSignature> {
    store: Store;
    totalRows?: number;
    get pageSize(): number;
    get relationships(): string | undefined;
    get additionalFilters(): Record<string, unknown>;
    registerApi(api: TableApi): void;
    loadData(data: TableLoadDataApi): Promise<never>;
    private getSortString;
    hasActionMenu: boolean;
    registerActionMenu(): void;
    private buildQueryOptions;
}
export {};
//# sourceMappingURL=table.d.ts.map