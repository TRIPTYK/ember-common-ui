import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type Store from '@ember-data/store';
import type ArrayProxy from '@ember/array/proxy';
import { action } from '@ember/object';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import type ModelRegistry from 'ember-data/types/registries/model';
import { waitFor } from '@ember/test-waiters';

export interface SortData {
  prop: string;
  direction: string;
}
export interface FilterData {
  filter: string;
  filterUsing?: string;
  columnFilters: { filter: string; fitlerUsing: string }[];
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
  // eslint-disable-next-line no-unused-vars
  registerApi?: (api: TableApi) => unknown;
  rowClick: Function;
  additionalFilters: Record<string, unknown>;
}

export default class TableGenericTable<
  T extends TableGenericTableArgs,
  K extends keyof ModelRegistry
> extends Component<T> {
  @service declare store: Store;

  @tracked totalRows?: number;

  public get pageSize(): number {
    return this.args.pageSize || 30;
  }

  public get entityName(): K {
    return this.args.entity;
  }

  public get relationships(): string | undefined {
    return this.args.relationships;
  }

  get additionalFilters() {
    return this.args.additionalFilters ?? {};
  }

  @action
  registerApi(api: TableApi) {
    this.args.registerApi?.(api);
  }

  @action
  @waitFor
  async loadData(
    data: TableLoadDataApi
  ): Promise<ArrayProxy<ModelRegistry[K]>> {
    const sortString = this.getSortString(data.sortData);

    const queryOptions = this.buildQueryOptions(
      this.relationships,
      this.additionalFilters,
      data.filterData,
      data.paginationData,
      sortString
    );

    const array = await this.store.query(this.entityName, queryOptions);

    this.totalRows = (
      array as unknown as ArrayProxy<K> & {
        meta: { fetched: number; total: number };
      }
    ).meta.total;

    return array;
  }

  private getSortString(sortData: SortData[]): string {
    return sortData
      .map(
        (sortField) =>
          `${sortField.direction === 'asc' ? '' : '-'}${sortField.prop}`
      )
      .join(',');
  }

  @tracked hasActionMenu = false;

  @action registerActionMenu() {
    this.hasActionMenu = true;
  }

  private buildQueryOptions(
    relationships: string | undefined,
    additionalFilters: Record<string, unknown>,
    filterData: FilterData | undefined,
    paginationData: PaginationData,
    sortString: string
  ): Record<string, unknown> {
    return {
      include: relationships,
      filter: {
        search: filterData?.filter,
        ...additionalFilters,
      },
      page: {
        size: paginationData.pageSize,
        number: paginationData.pageNumber,
      },
      sort: sortString || '-updatedAt',
    };
  }
}
