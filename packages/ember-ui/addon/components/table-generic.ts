import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type Store from '@ember-data/store';
import type ArrayProxy from '@ember/array/proxy';
import sanitizeString from '@triptyk/ember-utils/utils/sanitize-string';
import { action } from '@ember/object';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import type ModelRegistry from 'ember-data/types/registries/model';
import { waitFor } from '@ember/test-waiters';

export interface TableLoadDataApi {
  paginationData: {
    pageSize: number;
    pageNumber: number;
    pageStart: number;
    pageEnd: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    totalRows: number;
    totalPages: number;
  };
  sortData: {
    prop: string;
    direction: string;
  }[];
  filterData: {
    filter: string;
    filterUsing?: string;
    columnFilters: { filter: string; fitlerUsing: string }[];
  };
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
  registerApi?: (api: TableApi) => unknown;
  rowClick: Function;
  deleteElement: Function;
  additionalFilters: Record<string, unknown>;
}

export function formatSearchValue(q: string) {
  return q
    .split(' ')
    .filter((q) => q.trim() !== '')
    .map((part) => `${part}:*`)
    .join(' & ');
}
export default class TableGenericTable<
  T extends TableGenericTableArgs,
  K extends keyof ModelRegistry
> extends Component<T> {
  @service declare store: Store;

  @tracked totalRows?: number;
  @tracked filterText?: string;
  pageSize: number = 2;
  public tableApi?: TableApi;

  entityName: K = this.args.entity;
  relationships: string | undefined = this.args.relationships;

  get additionalFilters() {
    return this.args.additionalFilters ?? {};
  }

  @action
  onSearch(value: string) {
    this.filterText = value;
  }
  @action
  registerApi(api: TableApi) {
    this.args.registerApi?.(api);
    this.tableApi = api;
  }
  @action
  @waitFor
  async loadData(
    data: TableLoadDataApi
  ): Promise<ArrayProxy<ModelRegistry[K]>> {
    const sortString = data.sortData
      .map(
        (sortField) =>
          `${sortField.direction === 'asc' ? '' : '-'}${sortField.prop}`
      )
      .join(',');

    const queryOptions = {
      include: this.relationships ?? undefined,
      filter: {
        search: {
          $fulltext: data.filterData?.filter
            ? formatSearchValue(sanitizeString(data.filterData?.filter))
            : undefined,
        },
        ...this.additionalFilters,
      },
      page: {
        size: data.paginationData.pageSize,
        number: data.paginationData.pageNumber,
      },
      sort: sortString || '-updatedAt',
    };

    const array = await this.store.query(this.entityName, queryOptions);

    this.totalRows = (
      array as unknown as ArrayProxy<K> & {
        meta: { fetched: number; total: number };
      }
    ).meta.total;

    return array;
  }
}
