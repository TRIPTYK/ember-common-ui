import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import TableGenericBodyCellComponent from './body/cell';
import TableGenericBodyActionMenuComponent from './body/action-menu';
export interface TableGenericBodyComponentSignature {
    Args: {
        table: any;
        rowClick: (element?: unknown, e?: Event) => void;
        registerActionMenu: (element: HTMLTableCellElement, args: []) => unknown;
    };
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                Cell: WithBoundArgs<typeof TableGenericBodyCellComponent, 'row'>;
                ActionMenu: WithBoundArgs<typeof TableGenericBodyActionMenuComponent, 'registerActionMenu' | 'item' | 'index' | 'isExpanded'>;
            },
            Record<string, unknown>
        ];
    };
}
export default class TableGenericBodyComponent extends Component<TableGenericBodyComponentSignature> {
    isExpanded: boolean;
    get bodyClass(): "body expanded" | "body";
    toggle(): void;
    handleRowClick(element: unknown, event: Event): void;
}
//# sourceMappingURL=body.d.ts.map