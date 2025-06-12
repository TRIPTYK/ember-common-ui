import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import TpkActionsMenuElementComponent from './tpk-actions-menu/element.gts';
interface TpkActionsMenuComponentArgs {
}
export interface TpkActionsMenuElementComponentSignature {
    Args: TpkActionsMenuComponentArgs;
    Element: HTMLDivElement;
    Blocks: {
        default: [
            WithBoundArgs<typeof TpkActionsMenuElementComponent, 'handleAction'>
        ];
    };
}
export default class TpkActionsMenuComponent extends Component<TpkActionsMenuElementComponentSignature> {
    isOpen: boolean;
    get actionsMenuClass(): "actions aopened" | "actions";
    closeMenu(): void;
    handleKeyUp(e: KeyboardEvent): void;
    handleAction(action: (...args: unknown[]) => void, e: Event): void;
    toggle(e: Event): void;
}
export {};
//# sourceMappingURL=tpk-actions-menu.d.ts.map