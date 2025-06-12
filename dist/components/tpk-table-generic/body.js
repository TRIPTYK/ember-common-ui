import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-DQMK6eDu.js';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { action } from '@ember/object';
import TableGenericBodyCellComponent from './body/cell.js';
import TableGenericBodyActionMenuComponent from './body/action-menu.js';
import { fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import t from 'ember-intl/helpers/t';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TableGenericBodyComponent;
let TableGenericBodyComponent = (_class = (_TableGenericBodyComponent = class TableGenericBodyComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isExpanded", _descriptor, this);
  }
  get bodyClass() {
    return this.isExpanded ? 'body expanded' : 'body';
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}, setComponentTemplate(precompileTemplate("\n    <@table.tbody class=\"tpk-table-body\" ...attributes as |body data|>\n      {{#each data as |element index|}}\n        <body.row data-test-row={{element.id}} {{on \"click\" (fn @rowClick element)}} as |row|>\n          {{yield (hash Cell=(component TableGenericBodyCellComponent element=element row=row) ActionMenu=(component TableGenericBodyActionMenuComponent registerActionMenu=@registerActionMenu item=element isExpanded=this.isExpanded index=index)) element}}\n        </body.row>\n      {{else}}\n        <body.row as |row|>\n          <row.cell colspan={{@table.visibleColumns.length}}>\n            <div class=\"flex justify-center py-4\">\n              {{t \"global.missing\"}}\n            </div>\n          </row.cell>\n        </body.row>\n      {{/each}}\n    </@table.tbody>\n  ", {
  strictMode: true,
  scope: () => ({
    on,
    fn,
    hash,
    TableGenericBodyCellComponent,
    TableGenericBodyActionMenuComponent,
    t
  })
}), _TableGenericBodyComponent), _TableGenericBodyComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "isExpanded", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "toggle", [action], Object.getOwnPropertyDescriptor(_class.prototype, "toggle"), _class.prototype), _class);

export { TableGenericBodyComponent as default };
//# sourceMappingURL=body.js.map
