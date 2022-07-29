import Component from '@glimmer/component';
interface UiModalArgs {
    isOpen: boolean;
    onClose?: () => void;
    onClickOutside?: () => void;
    title: string;
    coverClass: string;
}
export default class UiModal extends Component<UiModalArgs> {
    constructor(owner: unknown, args: UiModalArgs);
    onEscape(): void;
    get modalKey(): string;
    get modalContainer(): Element;
}
export {};
