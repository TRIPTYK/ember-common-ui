import type { TOC } from '@ember/component/template-only';
export interface TableGenericHeaderCellSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    header: any;
    sortable?: boolean;
    prop?: string;
    sort?: string;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

const TableGenericHeaderCell: TOC<TableGenericHeaderCellSignature> = <template>
  <@header.column
    @sortable={{@sortable}}
    @prop={{@prop}}
    @sort={{@sort}}
    ...attributes
  >
    {{yield}}
  </@header.column>
</template>;

export default TableGenericHeaderCell;
