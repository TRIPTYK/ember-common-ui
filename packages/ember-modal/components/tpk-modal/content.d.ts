import Component from '@glimmer/component';
interface UiModalContentArgs {
    onClose: () => void;
    classless: boolean;
}
export default class UiModalContent extends Component<UiModalContentArgs> {
    guid: string;
}
export {};
