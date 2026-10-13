import type { TOC } from '@ember/component/template-only';
export interface TpkStackListHeadSignature {
    Args: {
        isExpanded: boolean;
        item: unknown;
        index: number;
        readOnly: boolean;
        onRemove: (...args: unknown[]) => unknown;
        toggleExpanded: (...args: unknown[]) => unknown;
    };
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                item: unknown;
                index: number;
            }
        ];
    };
}
declare const TpkStackListHead: TOC<TpkStackListHeadSignature>;
export default TpkStackListHead;
//# sourceMappingURL=head.d.ts.map