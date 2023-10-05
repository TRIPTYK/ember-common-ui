import Component from '@glimmer/component';

export interface TpkStackListComponentSignature {
  Args: {
    isExpanded: boolean;
    item: unknown;
    index: number;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        item: unknown;
        index: number;
      },
    ];
  };
}

export default class TpkStackListContentComponent extends Component<TpkStackListComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-stack-list/content': typeof TpkStackListContentComponent;
  }
}
