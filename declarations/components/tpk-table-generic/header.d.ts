import type { WithBoundArgs } from '@glint/template';
import TableGenericHeaderCellComponent from './header/cell.gts';
import type { TOC } from '@ember/component/template-only';
export interface TableGenericHeaderComponentSignature {
    Args: {
        table: any;
        hasActionMenu: boolean;
    };
    Blocks: {
        default: [
            {
                Cell: WithBoundArgs<typeof TableGenericHeaderCellComponent, 'header'>;
            }
        ];
    };
}
declare const TableGenericHeaderComponent: TOC<TableGenericHeaderComponentSignature>;
export default TableGenericHeaderComponent;
//# sourceMappingURL=header.d.ts.map