import type { TOC } from '@ember/component/template-only';
export interface TableGenericHeaderCellComponentSignature {
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

const TableGenericHeaderCellComponent: TOC<TableGenericHeaderCellComponentSignature> =
  <template>
    <@header.column @sortable={{@sortable}} @prop={{@prop}} @sort={{@sort}} ...attributes>
      {{yield}}
    </@header.column>
  </template>;

export default TableGenericHeaderCellComponent;
