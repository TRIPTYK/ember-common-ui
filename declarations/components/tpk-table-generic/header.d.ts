import type { WithBoundArgs } from '@glint/template';
import TableGenericHeaderCellComponent from './header/cell';
import type { TOC } from '@ember/component/template-only';
export interface TableGenericHeaderSignature {
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
declare const TableGenericHeader: TOC<TableGenericHeaderSignature>;
export default TableGenericHeader;
//# sourceMappingURL=header.d.ts.map