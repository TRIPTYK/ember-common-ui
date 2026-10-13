import Component from '@glimmer/component';
export interface TpkStackListTitleSignature {
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
export default class TpkStackListTitle extends Component<TpkStackListTitleSignature> {
    get isNotExpanded(): boolean;
}
//# sourceMappingURL=title.d.ts.map