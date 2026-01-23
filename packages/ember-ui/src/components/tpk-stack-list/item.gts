import { hash } from '@ember/helper';
import { action } from '@ember/object';
import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

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

  constructor(owner: Owner, args: StackListItemComponentArgs) {
    super(owner, args);
  }
  get index() {
    return 40 - this.args.zIndex;
  }

  @action toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  <template>
    {{! template-lint-disable no-inline-styles }}
    {{! template-lint-disable style-concatenation }}
    <div
      data-test-stackList-item={{@index}}
      class='tpk-stack'
      style='z-index: {{this.index}}'
      ...attributes
    >
      {{yield
        (hash toggleExpanded=this.toggleExpanded isExpanded=this.isExpanded)
      }}
    </div>
  </template>
}
