import Component from '@glimmer/component';
interface UiModalContentArgs {
    onClose: () => void;
    onClickOutside?: (_e: PointerEvent) => void;
}
export default class UiModalContent extends Component<UiModalContentArgs> {
    onClickOutside(e: PointerEvent): void;
}
export {};
