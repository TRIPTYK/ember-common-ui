import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TableGenericBodyCellComponent = setComponentTemplate(precompileTemplate("\n    {{!-- @glint-ignore --}}\n    <@row.cell ...attributes>\n      {{yield}}\n      {{!-- @glint-ignore --}}\n    </@row.cell>\n", {
  strictMode: true
}), templateOnly());

export { TableGenericBodyCellComponent as default };
//# sourceMappingURL=cell.js.map
