import Component from '@glimmer/component';
export interface TpkActionsMenuElementComponentSignature {
    Args: {
        handleAction: (action: (...args: unknown[]) => void, e: Event) => void;
        action?: (...args: unknown[]) => void;
        icon?: string;
        label?: string;
    };
    Element: HTMLLIElement;
    Blocks: {
        default: [];
    };
}
export default class TpkActionsMenuElementComponent extends Component<TpkActionsMenuElementComponentSignature> {
    get handleAction(): (action: (...args: unknown[]) => void, e: Event) => void;
    get action(): (...args: unknown[]) => void;
}
//# sourceMappingURL=element.d.ts.map