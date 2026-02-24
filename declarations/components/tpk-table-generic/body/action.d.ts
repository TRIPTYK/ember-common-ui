import type { TOC } from '@ember/component/template-only';
import type { Invokable } from '@glint/template/-private/integration';
export interface TableGenericBodyActionComponentSignature {
    Args: {
        Action: any;
        action: (...args: unknown[]) => void;
        icon?: TOC<{
            Element: SVGSVGElement;
        }> | Invokable<any>;
    };
    Element: HTMLDivElement;
    Blocks: {
        default: [];
    };
}
declare const TableGenericBodyActionComponent: TOC<TableGenericBodyActionComponentSignature>;
export default TableGenericBodyActionComponent;
//# sourceMappingURL=action.d.ts.map