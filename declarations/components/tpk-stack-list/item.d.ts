import type Owner from '@ember/owner';
import Component from '@glimmer/component';
interface StackListItemComponentArgs {
    index: number;
    zIndex: number;
}
export interface StackListItemSignature {
    Args: StackListItemComponentArgs;
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                toggleExpanded: StackListItem['toggleExpanded'];
                isExpanded: boolean;
            }
        ];
    };
}
export default class StackListItem extends Component<StackListItemSignature> {
    isExpanded: boolean;
    constructor(owner: Owner, args: StackListItemComponentArgs);
    get index(): number;
    toggleExpanded(): void;
}
export {};
//# sourceMappingURL=item.d.ts.map