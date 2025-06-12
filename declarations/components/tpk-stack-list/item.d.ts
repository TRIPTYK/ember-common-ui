import Component from '@glimmer/component';
interface StackListItemComponentArgs {
    index: number;
    zIndex: number;
}
export interface StackListItemComponentSignature {
    Args: StackListItemComponentArgs;
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                toggleExpanded: StackListItemComponent['toggleExpanded'];
                isExpanded: boolean;
            }
        ];
    };
}
export default class StackListItemComponent extends Component<StackListItemComponentSignature> {
    isExpanded: boolean;
    constructor(owner: unknown, args: StackListItemComponentArgs);
    get index(): number;
    toggleExpanded(): void;
}
export {};
//# sourceMappingURL=item.d.ts.map