import Component from '@glimmer/component';
export interface TpkStackListTitleComponentSignature {
    Args: {
        item: unknown;
        isExpanded: boolean;
        index: number;
    };
    Blocks: {
        default: [
            {
                item: unknown;
            }
        ];
    };
}
export default class TpkStackListTitleComponent extends Component<TpkStackListTitleComponentSignature> {
    get isNotExpanded(): boolean;
}
//# sourceMappingURL=title.d.ts.map