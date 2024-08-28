import Component from '@glimmer/component';
interface ActionsMenuComponentArgs {
    classless: boolean;
}
export default class ActionsMenuComponent extends Component<ActionsMenuComponentArgs> {
    isOpen: boolean;
    get actionsMenuClass(): "" | "actions aopened" | "actions";
    closeMenu(): void;
    handleKeyUp(e: KeyboardEvent): void;
    handleAction(action: Function, e: Event): any;
    toggle(e: Event): void;
}
export {};
//# sourceMappingURL=tpk-actions-menu.d.ts.map