import Component from '@glimmer/component';
export interface StackListItemComponentArgs {
    readOnly: boolean;
    zIndex: number;
}
export default class StackListItemComponent extends Component<StackListItemComponentArgs> {
    isExpanded: boolean;
    constructor(owner: unknown, args: StackListItemComponentArgs);
    get index(): number;
    toggleExpanded(): void;
}
//# sourceMappingURL=item.d.ts.map