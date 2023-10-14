import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';

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
      },
    ];
  };
}

export default class StackListItemComponent extends Component<StackListItemComponentSignature> {
  @tracked isExpanded: boolean = true;

  constructor(owner: unknown, args: StackListItemComponentArgs) {
    super(owner, args);
  }
  get index() {
    return 40 - this.args.zIndex;
  }

  @action toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-stack-list/item': typeof StackListItemComponent;
    'TpkStackList::Item': typeof StackListItemComponent;
  }
}
