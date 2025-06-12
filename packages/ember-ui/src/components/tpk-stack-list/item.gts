import { hash } from '@ember/helper';
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
        index: number;
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

  <template>
    <div
      data-test-stackList-item={{@index}}
      class='tpk-stack'
      style='z-index: {{this.index}}'
      ...attributes
    >
      {{yield
        (hash
          toggleExpanded=this.toggleExpanded
          isExpanded=this.isExpanded
          index=this.index
        )
      }}
    </div>
  </template>
}
