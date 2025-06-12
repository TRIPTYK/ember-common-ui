import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import TpkSearch from '@triptyk/ember-input/components/prefabs/tpk-search';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TableGenericSearchBarComponent;
let TableGenericSearchBarComponent = (_class = (_TableGenericSearchBarComponent = class TableGenericSearchBarComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "searchValue", _descriptor, this);
    assert('Please provide @onSearch to search input', args.onSearch !== undefined);
  }
  onSearch(e, value) {
    // prevent to submit form
    e.preventDefault();
    this.args.onSearch(value);
  }
}, setComponentTemplate(precompileTemplate("\n     <TpkSearch @label={{@label}} @placeholder={{@placeholder}} @onSearch={{this.onSearch}} />\n  ", {
  strictMode: true,
  scope: () => ({
    TpkSearch
  })
}), _TableGenericSearchBarComponent), _TableGenericSearchBarComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "searchValue", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _applyDecoratedDescriptor(_class.prototype, "onSearch", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onSearch"), _class.prototype), _class);

export { TableGenericSearchBarComponent as default };
//# sourceMappingURL=search-bar.js.map
