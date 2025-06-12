import type { WithBoundArgs } from '@glint/template';
import TpkStackListTitleComponent from './tpk-stack-list/title.gts';
import TpkStackListContentComponent from './tpk-stack-list/content.gts';
import type { TOC } from '@ember/component/template-only';
export interface TpkStackListComponentSignature {
    Args: {
        onRemove: (item: unknown) => void;
        data: unknown[];
        key?: string;
        onAdd: () => void;
        titleForAdd: string;
        readOnly: boolean;
        customButtonClass?: string;
    };
    Element: HTMLUListElement;
    Blocks: {
        default: [
            {
                Title: WithBoundArgs<typeof TpkStackListTitleComponent, 'isExpanded' | 'item' | 'index'>;
            } | {
                Content: WithBoundArgs<typeof TpkStackListContentComponent, 'isExpanded' | 'item' | 'index'>;
            }
        ];
    };
}
declare const TpkStackListComponent: TOC<TpkStackListComponentSignature>;
export default TpkStackListComponent;
//# sourceMappingURL=tpk-stack-list.d.ts.map