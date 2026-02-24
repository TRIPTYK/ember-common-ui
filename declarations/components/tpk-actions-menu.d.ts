import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import TpkActionsMenuElementComponent from './tpk-actions-menu/element';
export interface TpkActionsMenuElementComponentSignature {
    Args: object;
    Element: HTMLDivElement;
    Blocks: {
        default: [
            WithBoundArgs<typeof TpkActionsMenuElementComponent, 'handleAction'>
        ];
    };
}
export default class TpkActionsMenuComponent extends Component<TpkActionsMenuElementComponentSignature> {
    index: string;
    stopPropagation(e: Event): void;
    handleAction(action: (...args: unknown[]) => void, e: Event): void;
    hidePopover(e: Event): void;
}
//# sourceMappingURL=tpk-actions-menu.d.ts.map