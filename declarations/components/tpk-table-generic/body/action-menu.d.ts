import type { WithBoundArgs } from '@glint/template';
import Component from '@glimmer/component';
import TableGenericBodyActionComponent from './action';
export interface TableGenericBodyActionMenuSignature {
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
export default class TableGenericBodyActionMenu extends Component<TableGenericBodyActionMenuSignature> {
    registerActionMenu: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: HTMLTableCellElement;
    }>;
}
//# sourceMappingURL=action-menu.d.ts.map