import type { WithBoundArgs } from '@glint/template';
import TableGenericBodyActionComponent from './action.gts';
import type { TOC } from '@ember/component/template-only';
export interface TableGenericBodyActionMenuComponentSignature {
    Args: {
        item: unknown;
        index: number;
        isExpanded: boolean;
        registerActionMenu: (element: HTMLTableCellElement, args: []) => unknown;
    };
    Element: HTMLDivElement;
    Blocks: {
        default: [WithBoundArgs<typeof TableGenericBodyActionComponent, 'Action'>];
    };
}
declare const TableGenericBodyActionMenuComponent: TOC<TableGenericBodyActionMenuComponentSignature>;
export default TableGenericBodyActionMenuComponent;
//# sourceMappingURL=action-menu.d.ts.map