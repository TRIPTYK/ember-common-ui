import Component from '@glimmer/component';
import DialogLayer from '../services/dialog-layer';
export interface UiModalArgs {
    isOpen: boolean;
    onClose: () => unknown;
    outsideClickHandler?: (e: PointerEvent) => unknown;
    title: string;
    classless: boolean;
}
export default class UiModal extends Component<UiModalArgs> {
    dialogLayer: DialogLayer;
    guid: any;
    constructor(owner: unknown, args: UiModalArgs);
    get isOnTop(): boolean;
    handleEscapeKey: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: [boolean, () => void];
            Named: import("ember-modifier/-private/signature.js").EmptyObject;
        };
        Element: Element;
    }>;
    outsideClickHandler(e: PointerEvent): boolean | undefined;
    updateStack(): void;
    willDestroyNode(): void;
    close(): void;
    get modalKey(): string;
    get modalContainer(): Element;
}
//# sourceMappingURL=tpk-modal.d.ts.map