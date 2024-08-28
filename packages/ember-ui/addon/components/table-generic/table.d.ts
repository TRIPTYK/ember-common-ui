import Component from '@glimmer/component';
import type Store from '@ember-data/store';
import type ModelRegistry from 'ember-data/types/registries/model';
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
    reloadData: Function;
}
interface TableGenericTableArgs {
    entity: keyof ModelRegistry;
    relationships: string;
    pageSize?: number;
    registerApi?: (api: TableApi) => unknown;
    rowClick: Function;
    additionalFilters: Record<string, unknown>;
}
export default class TableGenericTable<T extends TableGenericTableArgs, K extends keyof ModelRegistry> extends Component<T> {
    store: Store;
    totalRows?: number;
    get pageSize(): number;
    get entityName(): K;
    get relationships(): string | undefined;
    get additionalFilters(): import("@glimmer/component/-private/component").Args<T>["additionalFilters"];
    registerApi(api: TableApi): void;
    loadData(data: TableLoadDataApi): Promise<import("ember-data").DS.AdapterPopulatedRecordArray<ModelRegistry[K]>>;
    private getSortString;
    hasActionMenu: boolean;
    registerActionMenu(): void;
    private buildQueryOptions;
}
export {};
//# sourceMappingURL=table.d.ts.map