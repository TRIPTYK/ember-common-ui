import Component from '@glimmer/component';

export interface TpkStackListTitleComponentSignature {
  Args: {
    item: unknown;
    isExpanded: boolean;
  };
  Blocks: {
    default: [
      {
        item: unknown;
      },
    ];
  };
}

export default class TpkStackListTitleComponent extends Component<TpkStackListTitleComponentSignature> {
  get isExpanded(): boolean {
    return this.args.isExpanded === true;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-stack-list/title': typeof TpkStackListTitleComponent;
  }
}
