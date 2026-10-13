import type { TOC } from '@ember/component/template-only';
import type { Invokable } from '@glint/template/-private/integration';
export interface TableGenericBodyActionSignature {
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
declare const TableGenericBodyAction: TOC<TableGenericBodyActionSignature>;
export default TableGenericBodyAction;
//# sourceMappingURL=action.d.ts.map