import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-DQMK6eDu.js';
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from 'tracked-built-ins';
import { action } from '@ember/object';
import { waitFor } from '@ember/test-waiters';
import TableGenericBodyComponent from './body.js';
import TableGenericHeaderComponent from './header.js';
import TableGenericFooterComponent from './footer.js';
import YetiTable from 'ember-yeti-table/components/yeti-table';
import { hash } from '@ember/helper';
import LoadingIndicator from '../tpk-loading-indicator.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _descriptor2, _descriptor3, _TableGenericTableComponent;
let TableGenericTableComponent = (_class = (_TableGenericTableComponent = class TableGenericTableComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "store", _descriptor, this);
    _initializerDefineProperty(this, "totalRows", _descriptor2, this);
    _initializerDefineProperty(this, "hasActionMenu", _descriptor3, this);
  }
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
  async loadData(data) {
    const sortString = this.getSortString(data.sortData);
    const queryOptions = this.buildQueryOptions(this.relationships, this.additionalFilters, data.filterData, data.paginationData, sortString);
    const array = await this.store.query(this.args.entity, queryOptions);
    this.totalRows = array.meta.total;
    return array;
  }
  getSortString(sortData) {
    return sortData.map(sortField => `${sortField.direction === 'asc' ? '' : '-'}${sortField.prop}`).join(',');
  }
  registerActionMenu() {
    this.hasActionMenu = true;
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
}, setComponentTemplate(precompileTemplate("\n    <YetiTable class=\"tpk-table-generic\" @loadData={{this.loadData}} @totalRows={{this.totalRows}} @filter={{@filterText}} @pagination={{true}} @registerApi={{this.registerApi}} @pageSize={{this.pageSize}} data-test-table ...attributes as |table|>\n      {{yield (hash Header=(component TableGenericHeaderComponent table=table hasActionMenu=this.hasActionMenu) Body=(component TableGenericBodyComponent table=table rowClick=@rowClick registerActionMenu=this.registerActionMenu) Footer=(component TableGenericFooterComponent table=table pageSizes=@pageSizes hasActionMenu=this.hasActionMenu))}}\n      {{#if table.isLoading}}\n        <LoadingIndicator />\n      {{/if}}\n    </YetiTable>\n  ", {
  strictMode: true,
  scope: () => ({
    YetiTable,
    hash,
    TableGenericHeaderComponent,
    TableGenericBodyComponent,
    TableGenericFooterComponent,
    LoadingIndicator
  })
}), _TableGenericTableComponent), _TableGenericTableComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "store", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "totalRows", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "registerApi", [action], Object.getOwnPropertyDescriptor(_class.prototype, "registerApi"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadData", [action, waitFor], Object.getOwnPropertyDescriptor(_class.prototype, "loadData"), _class.prototype), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "hasActionMenu", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "registerActionMenu", [action], Object.getOwnPropertyDescriptor(_class.prototype, "registerActionMenu"), _class.prototype), _class);

export { TableGenericTableComponent as default };
//# sourceMappingURL=table.js.map
