import Component from '@glimmer/component';
interface UiModalContentArgs {
    onClose: () => void;
    outsideClickHandler: (e: MouseEvent | TouchEvent) => boolean;
    title?: string;
}
export interface UiModalContentSignature {
    Args: UiModalContentArgs;
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                guid: string;
            }
        ];
    };
}
export default class TpkModalContentComponent extends Component<UiModalContentSignature> {
    guid: string;
    constructor(owner: unknown, args: UiModalContentArgs);
}
export {};
//# sourceMappingURL=content.d.ts.map