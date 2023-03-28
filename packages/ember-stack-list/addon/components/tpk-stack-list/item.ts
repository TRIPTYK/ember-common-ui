import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';

export interface StackListItemComponentArgs {
  readOnly: boolean;
  zIndex: number;
}

export default class StackListItemComponent extends Component<StackListItemComponentArgs> {
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
