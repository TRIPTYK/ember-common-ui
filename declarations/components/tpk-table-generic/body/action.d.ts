import type { TOC } from '@ember/component/template-only';
export interface TableGenericBodyActionComponentSignature {
    Args: {
        Action: any;
        action: (...args: unknown[]) => void;
        icon: string;
    };
    Element: HTMLDivElement;
    Blocks: {
        default: [];
    };
}
declare const TableGenericBodyActionComponent: TOC<TableGenericBodyActionComponentSignature>;
export default TableGenericBodyActionComponent;
//# sourceMappingURL=action.d.ts.map