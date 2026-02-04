import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import TableGenericBodyComponent from './body.js';
import TableGenericHeaderComponent from './header.js';
import TableGenericFooterComponent from './footer.js';
import YetiTable from '@triptyk/ember-yeti-table/components/yeti-table';
import { hash } from '@ember/helper';
import LoadingIndicator from '../tpk-loading-indicator.js';
import { assert } from '@ember/debug';
import { query } from '@warp-drive/utilities/json-api';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class TableGenericTableComponent extends Component {
  static {
    g(this.prototype, "store", [service]);
  }
  #store = (i(this, "store"), void 0);
  static {
    g(this.prototype, "totalRows", [tracked]);
  }
  #totalRows = (i(this, "totalRows"), void 0);
  get pageSize() {
    return this.args.pageSize || 30;
  }
  get relationships() {
    return this.args.relationships;
  }
  get additionalFilters() {
    return this.args.additionalFilters ?? {};
  }
  registerApi(api) {
    this.args.registerApi?.(api);
  }
  static {
    n(this.prototype, "registerApi", [action]);
  }
  loadData = async data => {
    const sortString = this.getSortString(data.sortData);
    const queryOptions = this.buildQueryOptions(this.relationships, this.additionalFilters, data.filterData, data.paginationData, sortString);
    const filter = new Map();
    if (queryOptions.filter) {
      for (const [key, value] of Object.entries(queryOptions.filter ?? {})) {
        if (value === undefined) continue;
        filter.set(`filter[${key}]`, value);
      }
    }
    const response = await this.store.request(query(this.args.entity,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    {
      include: queryOptions.include ?? [],
      'page[size]': queryOptions.page.size,
      'page[number]': queryOptions.page.number,
      sort: queryOptions.sort,
      ...Object.fromEntries(filter)
    }, {
      reload: true
    }));
    const content = response.content;
    assert('Response from store.request must be an object', typeof response === 'object' && response !== null);
    assert('Response from store.request is missing data property', content.data !== undefined);
    assert('The response of the table generic component loadData must be an ArrayProxy', Array.isArray(content.data));
    assert('The response of the table generic component loadData must have a content.meta.total property', content.meta !== undefined && typeof content.meta.total === 'number');
    this.totalRows = content.meta.total;
    return content.data;
  };
  getSortString(sortData) {
    return sortData.map(sortField => `${sortField.direction === 'asc' ? '' : '-'}${sortField.prop}`).join(',');
  }
  static {
    g(this.prototype, "hasActionMenu", [tracked], function () {
      return false;
    });
  }
  #hasActionMenu = (i(this, "hasActionMenu"), void 0);
  registerActionMenu() {
    this.hasActionMenu = true;
  }
  static {
    n(this.prototype, "registerActionMenu", [action]);
  }
  buildQueryOptions(relationships, additionalFilters, filterData, paginationData, sortString) {
    return {
      include: relationships,
      filter: {
        search: filterData?.filter,
        ...additionalFilters
      },
      page: {
        size: paginationData.pageSize,
        number: paginationData.pageNumber
      },
      sort: sortString || this.args.defaultSortColumn || '-updatedAt'
    };
  }
  static {
    setComponentTemplate(precompileTemplate("<YetiTable class=\"tpk-table-generic\" @loadData={{this.loadData}} @totalRows={{this.totalRows}} @filter={{@filterText}} @pagination={{true}} @registerApi={{this.registerApi}} @pageSize={{this.pageSize}} data-test-table ...attributes as |table|>\n  {{yield (hash Header=(component TableGenericHeaderComponent table=table hasActionMenu=this.hasActionMenu) Body=(component TableGenericBodyComponent table=table rowClick=@rowClick registerActionMenu=this.registerActionMenu) Footer=(component TableGenericFooterComponent table=table pageSizes=@pageSizes hasActionMenu=this.hasActionMenu))}}\n  {{#if table.isLoading}}\n    <LoadingIndicator />\n  {{/if}}\n</YetiTable>", {
      strictMode: true,
      scope: () => ({
        YetiTable,
        hash,
        TableGenericHeaderComponent,
        TableGenericBodyComponent,
        TableGenericFooterComponent,
        LoadingIndicator
      })
    }), this);
  }
}

export { TableGenericTableComponent as default };
//# sourceMappingURL=table.js.map
