import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import TableGenericSearchBarComponent from './tpk-table-generic/search-bar.js';
import TableGenericTableComponent from './tpk-table-generic/table.js';
import { hash } from '@ember/helper';
import 'ember-intl/services/intl';
import { service } from '@ember/service';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _descriptor2, _TableGenericComponent;
let TableGenericComponent = (_class = (_TableGenericComponent = class TableGenericComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "intl", _descriptor, this);
    _initializerDefineProperty(this, "filterText", _descriptor2, this);
  }
  get label() {
    if (this.args.label) {
      return this.args.label;
    }
    return this.intl.t('global.search');
  }
  get placeholder() {
    if (this.args.placeholder) {
      return this.args.placeholder;
    }
    return this.intl.t('global.search');
  }
  onSearch(value) {
    this.filterText = value;
  }
  rowClick(element, e) {
    this.args.rowClick?.(element, e);
  }
}, setComponentTemplate(precompileTemplate("\n    {{log \"generic table\" this.label this.placeholder}}\n    {{yield (hash onSearch=this.onSearch SearchBar=(component TableGenericSearchBarComponent onSearch=this.onSearch label=this.label placeholder=this.placeholder) Table=(component TableGenericTableComponent rowClick=this.rowClick filterText=this.filterText relationships=@relationships registerApi=@registerApi entity=@entity pageSizes=@pageSizes pageSize=@pageSize additionalFilters=@additionalFilters defaultSortColumn=@defaultSortColumn))}}\n  ", {
  strictMode: true,
  scope: () => ({
    hash,
    TableGenericSearchBarComponent,
    TableGenericTableComponent
  })
}), _TableGenericComponent), _TableGenericComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "intl", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "filterText", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "onSearch", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onSearch"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "rowClick", [action], Object.getOwnPropertyDescriptor(_class.prototype, "rowClick"), _class.prototype), _class);

export { TableGenericComponent as default };
//# sourceMappingURL=tpk-table-generic.js.map
