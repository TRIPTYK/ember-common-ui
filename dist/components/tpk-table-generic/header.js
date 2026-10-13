import TableGenericHeaderCell from './header/cell.js';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TableGenericHeader = setComponentTemplate(precompileTemplate("<@table.header class=\"tpk-table-header\" as |header|>\n  {{yield (hash Cell=(component TableGenericHeaderCellComponent header=header))}}\n  {{#if @hasActionMenu}}\n    {{!-- A simple th,  no need to register this column to yeti table --}}\n    <th data-test-action-menu-header></th>\n  {{/if}}\n</@table.header>", {
  strictMode: true,
  scope: () => ({
    hash,
    TableGenericHeaderCellComponent: TableGenericHeaderCell
  })
}), templateOnly());

export { TableGenericHeader as default };
//# sourceMappingURL=header.js.map
