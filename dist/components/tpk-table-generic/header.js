import TableGenericHeaderCellComponent from './header/cell.js';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TableGenericHeaderComponent = setComponentTemplate(precompileTemplate("\n    <@table.header class=\"tpk-table-header\" as |header|>\n      {{yield (hash Cell=(component TableGenericHeaderCellComponent header=header))}}\n      {{#if @hasActionMenu}}\n        {{!-- A simple th,  no need to register this column to yeti table --}}\n        <th data-test-action-menu-header></th>\n      {{/if}}\n    </@table.header>\n  ", {
  strictMode: true,
  scope: () => ({
    hash,
    TableGenericHeaderCellComponent
  })
}), templateOnly());

export { TableGenericHeaderComponent as default };
//# sourceMappingURL=header.js.map
