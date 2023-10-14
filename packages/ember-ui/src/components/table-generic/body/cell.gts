import { TOC } from '@ember/component/template-only';

export interface TableGenericBodyCellComponentSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

const TableGenericBodyCellComponent: TOC<TableGenericBodyCellComponentSignature> =
  <template>
    <@row.cell ...attributes>
      {{yield}}
    </@row.cell>
</template>;

export default TableGenericBodyCellComponent;
