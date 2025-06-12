import type { TOC } from '@ember/component/template-only';
export interface TpkStackListHeadComponentSignature {
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
declare const TpkStackListHeadComponent: TOC<TpkStackListHeadComponentSignature>;
export default TpkStackListHeadComponent;
//# sourceMappingURL=head.d.ts.map