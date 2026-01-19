import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from 'tracked-built-ins';
import type { Store } from '@warp-drive/core';
import { action } from '@ember/object';
import type { WithBoundArgs } from '@glint/template';
import TableGenericBodyComponent from './body.gts';
import TableGenericHeaderComponent from './header.gts';
import TableGenericFooterComponent from './footer.gts';
// @ts-expect-error missing types
import YetiTable from 'ember-yeti-table/components/yeti-table';
import { hash } from '@ember/helper';
import LoadingIndicator from '../tpk-loading-indicator.gts';
import { assert } from '@ember/debug';
import type { StructuredDataDocument } from '@warp-drive/core/types/request';
import type { ReactiveResource, ReactiveResourceArray } from '@warp-drive/core/reactive';
import type ObjectProxy from '@ember/object/proxy';

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

interface TableResponse {
  data: Record<string, unknown>[];
  meta: {
    total: number;
  };
}

export default class TableGenericTableComponent extends Component<TableGenericTableSignature> {
  @service declare store: Store;
  @tracked totalRows?: number;

  public get pageSize(): number {
    return this.args.pageSize || 30;
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

  loadData = async (data: TableLoadDataApi) => {
    const sortString = this.getSortString(data.sortData);

    const queryOptions = this.buildQueryOptions(
      this.relationships,
      this.additionalFilters,
      data.filterData,
      data.paginationData,
      sortString,
    );

    const urlParameters = new URLSearchParams();
    urlParameters.append('page[size]', data.paginationData.pageSize.toString());
    urlParameters.append('page[number]', data.paginationData.pageNumber.toString());
    urlParameters.append('sort', queryOptions.sort);
    if (queryOptions.include) {
      urlParameters.append('include', queryOptions.include);
    }
    if (queryOptions.filter) {
      for (const [key, value] of Object.entries(
        queryOptions.filter ?? {}
      )) {
        if (value === undefined) continue;
        urlParameters.append(`filter[${key}]`, value);
      }
    }
    for (const [key, value] of Object.entries(this.additionalFilters ?? {})) {
      if (value === undefined || value === null) continue;
      urlParameters.append(`filter[${key}]`, value);
    }



    const response: StructuredDataDocument<TableResponse> = await this.store.request({
      url: `/${this.args.entity}?${urlParameters.toString()}`,
      method: 'GET',
      // We need to reload cache, something weird is happening
      cacheOptions: {
        reload: true,
      }
    });
    const content = response.content;

    assert(
      'Response from store.request must be an object',
      typeof response === 'object' && response !== null,
    );
    assert(
      'Response from store.request is missing data property',
      content.data !== undefined,
    );
    assert(
      'The response of the table generic component loadData must be an ArrayProxy',
      Array.isArray(content.data),
    );
    assert(
      'The response of the table generic component loadData must have a content.meta.total property',
      content.meta !== undefined && typeof content.meta.total === 'number',
    );

    this.totalRows = content.meta.total;
    return content.data;
  };

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
    sortString?: string,
  ) {
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
      sort: sortString || this.args.defaultSortColumn || '-updatedAt',
    };
  }

  <template>
    <YetiTable
      class='tpk-table-generic'
      @loadData={{this.loadData}}
      @totalRows={{this.totalRows}}
      @filter={{@filterText}}
      @pagination={{true}}
      @registerApi={{this.registerApi}}
      @pageSize={{this.pageSize}}
      data-test-table
      ...attributes
      as |table|
    >
      {{yield
        (hash
          Header=(component
            TableGenericHeaderComponent
            table=table
            hasActionMenu=this.hasActionMenu
          )
          Body=(component
            TableGenericBodyComponent
            table=table
            rowClick=@rowClick
            registerActionMenu=this.registerActionMenu
          )
          Footer=(component
            TableGenericFooterComponent
            table=table
            pageSizes=@pageSizes
            hasActionMenu=this.hasActionMenu
          )
        )
      }}
      {{#if table.isLoading}}
        <LoadingIndicator />
      {{/if}}
    </YetiTable>
  </template>
}
