import { hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import didUpdate from '@ember/render-modifiers/modifiers/did-update';
import { tracked } from 'tracked-built-ins';

interface StackListItemComponentArgs {
  index: number;
  zIndex: number;
  item: unknown;
  isExpandedFor?: (item: unknown, index: number) => boolean;
  defaultExpanded?: boolean;
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
    this.setInitialExpandedState();
  }

  get index() {
    return 2000 - this.args.zIndex;
  }

  @action
  syncExpandedState() {
    if (this.args.isExpandedFor) {
      this.isExpanded = this.args.isExpandedFor(
        this.args.item,
        this.args.index,
      );
    }
  }

  @action
  setInitialExpandedState() {
    if (this.args.isExpandedFor) {
      this.isExpanded = this.args.isExpandedFor(
        this.args.item,
        this.args.index,
      );
      return;
    }

    if (this.args.defaultExpanded !== undefined) {
      this.isExpanded = this.args.defaultExpanded;
      return;
    }

    this.isExpanded = true;
  }

  @action toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  <template>
    <div
      data-test-stackList-item={{@index}}
      class='tpk-stack'
      style='z-index: {{this.index}}'
      {{didUpdate this.syncExpandedState @index @item}}
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
