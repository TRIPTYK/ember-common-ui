import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TableGenericBodyCell = setComponentTemplate(precompileTemplate("{{!-- @glint-ignore --}}\n<@row.cell ...attributes>\n  {{yield}}\n  {{!-- @glint-ignore --}}\n</@row.cell>", {
  strictMode: true
}), templateOnly());

export { TableGenericBodyCell as default };
//# sourceMappingURL=cell.js.map
