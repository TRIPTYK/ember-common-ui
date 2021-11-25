import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

interface UiTextareaArgs {
  containerStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
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

  get containerStyle() {
    return this.args.containerStyle ?? 'w-full';
  }

  get labelStyle() {
    return this.args.labelStyle ?? 'text-gray-800 font-semibold mb-1 block';
  }

  get inputStyle() {
    return (
      this.args.inputStyle ??
      'bg-gray-200 outline-none transition-all duration-200 rounded-full border-2 border-gray-200 pt-1.5 pb-1.5 px-3 font-semibold text-gray-700 focus:outline-none focus:border-gray-600 focus:ring-0 w-full'
    );
  }

  get limitStyle() {
    return this.args.limitStyle ?? 'text-gray-500 text-sm mt-1';
  }

  get tooltipStyle() {
    return this.args.tooltipStyle ?? 'text-gray-500 text-sm mt-1';
  }

  @action
  hasChange(event: Event) {
    if (this.args.limit) {
      this.actualSize = (
        (event.target as HTMLInputElement).value as string
      ).length;
    }
    if (this.args.updateValue) {
      this.args.updateValue?.((event.target as HTMLInputElement).value);
    }
  }
}
