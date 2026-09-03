import type { TOC } from '@ember/component/template-only';
export interface TableGenericHeaderCellSignature {
    Args: {
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
declare const TableGenericHeaderCell: TOC<TableGenericHeaderCellSignature>;
export default TableGenericHeaderCell;
//# sourceMappingURL=cell.d.ts.map