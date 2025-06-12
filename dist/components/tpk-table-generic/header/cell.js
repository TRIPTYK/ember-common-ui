import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TableGenericHeaderCellComponent = setComponentTemplate(precompileTemplate("\n    <@header.column @sortable={{@sortable}} @prop={{@prop}} @sort={{@sort}} ...attributes>\n      {{yield}}\n    </@header.column>\n  ", {
  strictMode: true
}), templateOnly());

export { TableGenericHeaderCellComponent as default };
//# sourceMappingURL=cell.js.map
