import type { WithBoundArgs } from '@glint/template';
import TpkStackListTitleComponent from './tpk-stack-list/title';
import TpkStackListContentComponent from './tpk-stack-list/content';
import type { TOC } from '@ember/component/template-only';
export interface TpkStackListSignature {
    Args: {
        onRemove: (item: unknown) => void;
        data: unknown[];
        key?: string;
        onAdd: () => void;
        titleForAdd: string;
        readOnly?: boolean;
        customButtonClass?: string;
    };
    Element: HTMLUListElement;
    Blocks: {
        default: [
            {
                Title: WithBoundArgs<typeof TpkStackListTitleComponent, 'isExpanded' | 'item' | 'index'>;
                Content: WithBoundArgs<typeof TpkStackListContentComponent, 'isExpanded' | 'item' | 'index'>;
            }
        ];
    };
}
declare const TpkStackList: TOC<TpkStackListSignature>;
export default TpkStackList;
//# sourceMappingURL=tpk-stack-list.d.ts.map