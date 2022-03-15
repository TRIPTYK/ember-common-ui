import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiTextareaArgs {
  // eslint-disable-next-line no-unused-vars
  updateValue?: (value: string) => void;
  mandatory?: boolean;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class UiTextarea extends Component<UiTextareaArgs> {
  @tracked count = 0;
  guid = guidFor(this);

  @action
  updateValue(e: Event) {
    e.preventDefault();
    const { value } = e.target as HTMLTextAreaElement;
    this.count = value.length;
    this.args.updateValue?.(value);
  }
}
