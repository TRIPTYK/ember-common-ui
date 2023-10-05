import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from 'tracked-built-ins';
import type Store from '@ember-data/store';
import type ArrayProxy from '@ember/array/proxy';
import { action } from '@ember/object';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import type ModelRegistry from 'ember-data/types/registries/model';
import { waitFor } from '@ember/test-waiters';
import { WithBoundArgs } from '@glint/template';
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
  reloadData: () => void;
}

interface TableGenericTableArgs {
  entity: keyof ModelRegistry;
  relationships: string;
  pageSizes?: number[];
  filterText?: string;
  // eslint-disable-next-line no-unused-vars
  registerApi?: (api: TableApi) => unknown;
  rowClick: () => void;
  additionalFilters: Record<string, unknown>;
}

interface TableGenericTableSignature {
  Args: TableGenericTableArgs;
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Body: WithBoundArgs<
          typeof TableGenericBodyComponent,
          'table' | 'rowClick' | 'registerActionMenu'
        >;
        Header: WithBoundArgs<
          typeof TableGenericHeaderComponent,
          'table' | 'hasActionMenu'
        >;
        Footer: WithBoundArgs<
          typeof TableGenericFooterComponent,
          'table' | 'pageSizes' | 'hasActionMenu'
        >;
      },
    ];
  };
}

export default class TableGenericTable<
  K extends keyof ModelRegistry,
> extends Component<TableGenericTableSignature> {
  @service declare store: Store;

  @tracked totalRows?: number;

  public get pageSizes(): number[] {
    return this.args.pageSizes || [30];
  }

  public get entityName() {
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
  async loadData(data: TableLoadDataApi): Promise<never> {
    const sortString = this.getSortString(data.sortData);

    const queryOptions = this.buildQueryOptions(
      this.relationships,
      this.additionalFilters,
      data.filterData,
      data.paginationData,
      sortString,
    );

    const array = await this.store.query(this.entityName, queryOptions);

    this.totalRows = (
      array as unknown as ArrayProxy<K> & {
        meta: { fetched: number; total: number };
      }
    ).meta.total;

    return array as never;
  }

  private getSortString(sortData: SortData[]): string {
    return sortData
      .map(
        (sortField) =>
          `${sortField.direction === 'asc' ? '' : '-'}${sortField.prop}`,
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
    sortString: string,
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic/table': typeof TableGenericTable;
  }
}
