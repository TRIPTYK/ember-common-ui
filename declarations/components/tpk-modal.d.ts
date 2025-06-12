import Component from '@glimmer/component';
import DialogLayerService from '../services/dialog-layer.ts';
import type { WithBoundArgs } from '@glint/template';
import TpkModalContentComponent from './tpk-modal/content.gts';
export interface TpkModalComponentArgs {
    isOpen: boolean;
    onClose: () => unknown;
    outsideClickHandler?: (e: MouseEvent | TouchEvent) => unknown;
    title?: string;
}
export interface TpkModalComponentSignature {
    Args: TpkModalComponentArgs;
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                Content: WithBoundArgs<typeof TpkModalContentComponent, 'title' | 'onClose' | 'outsideClickHandler'>;
                isOnTop: boolean;
                isOpen: boolean;
                onClose: () => unknown;
                guid: string;
            }
        ];
    };
}
export default class TpkModalComponent extends Component<TpkModalComponentSignature> {
    dialogLayer: DialogLayerService;
    guid: string;
    constructor(owner: unknown, args: TpkModalComponentArgs);
    get isOnTop(): boolean;
    handleEscapeKey: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: [boolean, () => void];
            Named: import("ember-modifier/-private/signature.js").EmptyObject;
        };
        Element: Element;
    }>;
    outsideClickHandler(e: MouseEvent | TouchEvent): boolean;
    updateStack(): void;
    willDestroyNode(): void;
    close(): void;
    get modalKey(): string;
    get modalContainer(): Element;
}
//# sourceMappingURL=tpk-modal.d.ts.map