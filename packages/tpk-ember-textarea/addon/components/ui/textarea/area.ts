import { action } from '@ember/object';
import Component from '@glimmer/component';

interface UiTextareaAreaArgs {
  // eslint-disable-next-line no-unused-vars
  updateValue: (value: Event) => void;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class UiTextareaArea extends Component<UiTextareaAreaArgs> {
  @action
  hasChange(event: Event) {
    this.args.updateValue(event);
  }
}
