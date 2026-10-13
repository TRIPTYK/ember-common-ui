import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TableGenericHeaderCell = setComponentTemplate(precompileTemplate("<@header.column @sortable={{@sortable}} @prop={{@prop}} @sort={{@sort}} ...attributes>\n  {{yield}}\n</@header.column>", {
  strictMode: true
}), templateOnly());

export { TableGenericHeaderCell as default };
//# sourceMappingURL=cell.js.map
