import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

interface UiTextareaArgs {
  containerStyle?: string;
  labelStyle?: string;
  textareaStyle?: string;
  limitStyle?: string;
  tooltipStyle?: string;
  value: number | string;
  label?: string;
  name: string;
  // eslint-disable-next-line no-unused-vars
  updateValue?: (value: string) => void;
  placeholder?: string;
  infoTooltip?: string;
  mandatory?: boolean;
  limit?: number;
  hasError?: boolean;
  disabled?: boolean;
}

export default class UiTextarea extends Component<UiTextareaArgs> {
  guid = guidFor(this);
  @tracked actualSize: number = 0;
  @tracked showPassword: boolean = false;

  constructor(owner: unknown, args: UiTextareaArgs) {
    super(owner, args);
    if (!args.name) {
      throw new Error('You must pass a valid @name as argument');
    }
    if (args.value === undefined) {
      throw new Error('You must pass a valid @value as argument');
    } else {
      if (args.limit) {
        this.actualSize = (args.value as string).length;
      }
    }
  }

  @action
  hasChange(event: Event) {
    if (this.args.limit) {
      this.actualSize = (
        (event.target as HTMLTextAreaElement).value as string
      ).length;
    }
    if (this.args.updateValue) {
      this.args.updateValue?.((event.target as HTMLTextAreaElement).value);
    }
  }
}
