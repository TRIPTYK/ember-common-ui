import type { TOC } from '@ember/component/template-only';
export interface TpkStackListSignature {
    Args: {
        isExpanded: boolean;
        item: unknown;
        index: number;
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
declare const TpkStackListContent: TOC<TpkStackListSignature>;
export default TpkStackListContent;
//# sourceMappingURL=content.d.ts.map