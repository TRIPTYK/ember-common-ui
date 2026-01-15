import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export interface TableGenericBodyCellComponentSignature {
  Args: {
    row: ComponentLike;
  };
  Element: HTMLElement;
  Blocks: {
    default: [];
  };
}

const TableGenericBodyCellComponent: TOC<TableGenericBodyCellComponentSignature> =
  <template>
    {{! @glint-ignore }}
    <@row.cell ...attributes>
      {{yield}}
      {{! @glint-ignore }}
    </@row.cell>
  </template>;

export default TableGenericBodyCellComponent;
