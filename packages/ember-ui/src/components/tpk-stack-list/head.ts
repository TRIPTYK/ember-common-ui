import Component from '@glimmer/component';

interface TpkStackListHeadComponentSignature {
  Args: {
    isExpanded: boolean;
    item: unknown;
    index: number;
    readOnly: boolean;
    onRemove: (...args: unknown[]) => unknown;
    toggleExpanded: (...args: unknown[]) => unknown;
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

export default class TpkStackListHeadComponent extends Component<TpkStackListHeadComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-stack-list/head': typeof TpkStackListHeadComponent;
    'TpkStackList::Head': typeof TpkStackListHeadComponent;
  }
}
