import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export interface TableGenericBodyCellComponentSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: ComponentLike;
  };
  Element: HTMLElement;
  Blocks: {
    default: [];
  };
}

const TableGenericBodyCellComponent: TOC<TableGenericBodyCellComponentSignature> =
  <template>
    {{!-- @glint-ignore --}}
    <@row.cell ...attributes>
      {{yield}}
      {{!-- @glint-ignore --}}
    </@row.cell>
</template>;

export default TableGenericBodyCellComponent;
