import Component from '@glimmer/component';
import type { TOC } from '@ember/component/template-only';
import type { Invokable } from '@glint/template/-private/integration';
export interface TpkActionsMenuElementSignature {
    Args: {
        handleAction: (action: (...args: unknown[]) => void, e: Event) => void;
        action?: (...args: unknown[]) => void;
        icon?: TOC<{
            Element: SVGSVGElement;
        }> | Invokable<any>;
        label?: string;
    };
    Element: HTMLLIElement;
    Blocks: {
        default: [];
    };
}
export default class TpkActionsMenuElement extends Component<TpkActionsMenuElementSignature> {
    get handleAction(): (action: (...args: unknown[]) => void, e: Event) => void;
    get action(): (...args: unknown[]) => void;
}
//# sourceMappingURL=element.d.ts.map