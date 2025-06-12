import { _ as _defineProperty } from '../../_rollupPluginBabelHelpers-DQMK6eDu.js';
import Component from '@glimmer/component';
import TableGenericComponent from '../tpk-table-generic.js';
import { get } from '@ember/object';
import { fn } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TableGenericPrefabComponent;
class TableGenericPrefabComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "getComponent", component => {
      if (!this.args.columnsComponent || !this.args.columnsComponent[component]) {
        throw new Error(`Component ${component} not found`);
      }
      return this.args.columnsComponent[component];
    });
    _defineProperty(this, "displayValue", (element, field) => {
      const value = get(element, field);
      const column = this.columns.find(column => column.field === field);
      if (column?.renderElement) {
        return column.renderElement(value);
      }
      return String(value);
    });
    _defineProperty(this, "displayRawValue", (element, field) => {
      return get(element, field);
    });
  }
  get pageSizes() {
    if (this.args.tableParams.pageSizes) {
      return this.args.tableParams.pageSizes;
    }
    return [5, 10, 25];
  }
  get entity() {
    if (!this.args.tableParams.entity) {
      throw new Error("entity is required");
    }
    return this.args.tableParams.entity;
  }
  get columns() {
    if (!this.args.tableParams.columns) {
      throw new Error("entityKeys is required");
    }
    return this.args.tableParams.columns;
  }
  get hasActionMenu() {
    if (!this.args.tableParams.actionMenu) {
      return false;
    }
    return this.args.tableParams.actionMenu.length ? true : false;
  }
  get actions() {
    return this.args.tableParams.actionMenu;
  }
}
_TableGenericPrefabComponent = TableGenericPrefabComponent;
setComponentTemplate(precompileTemplate("\n    <div class=\"tpk-table-generic-container\" data-test-table-generic-prefab>\n      <TpkTableGeneric @pageSizes={{this.pageSizes}} @additionalFilters={{@tableParams.additionalFilters}} @defaultSortColumn={{@tableParams.defaultSortColumn}} @entity={{this.entity}} @rowClick={{@tableParams.rowClick}} @relationships={{@tableParams.relationships}} as |TG|>\n        <TG.SearchBar />\n        <TG.Table as |Table|>\n          <Table.Header as |Header|>\n            {{#each this.columns as |column|}}\n              <Header.Cell @sortable={{column.sortable}} @prop={{column.field}}>\n                {{column.headerName}}\n              </Header.Cell>\n            {{/each}}\n          </Table.Header>\n          <Table.Body as |Body element|>\n            {{#each this.columns as |column|}}\n              <Body.Cell>\n                {{#if column.component}}\n                  {{#let (this.getComponent column.component) as |ComponentName|}}\n                    <ComponentName @row={{element}} @field={{column.field}} @cellValue={{this.displayRawValue element column.field}} @cellValueFormated={{this.displayValue element column.field}} />\n                  {{/let}}\n                {{else}}\n                    {{this.displayValue element column.field}}\n                {{/if}}\n              </Body.Cell>\n            {{/each}}\n            {{#if this.hasActionMenu}}\n              <Body.ActionMenu as |Action|>\n                {{#each this.actions as |actionElement|}}\n                {{log actionElement.action}}\n                  <Action @icon={{actionElement.icon}} @action={{fn actionElement.action element}}>\n                    {{actionElement.name}}\n                  </Action>\n                {{/each}}\n              </Body.ActionMenu>\n            {{/if}}\n          </Table.Body>\n          <Table.Footer />\n        </TG.Table>\n    </TpkTableGeneric>\n  </div>\n", {
  strictMode: true,
  scope: () => ({
    TpkTableGeneric: TableGenericComponent,
    fn
  })
}), _TableGenericPrefabComponent);

export { TableGenericPrefabComponent as default };
//# sourceMappingURL=tpk-table-generic-prefab.js.map
