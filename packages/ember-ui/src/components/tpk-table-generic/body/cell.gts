import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export interface TableGenericBodyCellSignature {
  Args: {
    row: ComponentLike;
  };
  Element: HTMLElement;
  Blocks: {
    default: [];
  };
}

const TableGenericBodyCell: TOC<TableGenericBodyCellSignature> = <template>
  {{! @glint-ignore }}
  <@row.cell ...attributes>
    {{yield}}
    {{! @glint-ignore }}
  </@row.cell>
</template>;

export default TableGenericBodyCell;
