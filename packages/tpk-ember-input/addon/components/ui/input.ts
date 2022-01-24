import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

interface UiInputArgs {
  containerStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  passwordStyle?: string;
  limitStyle?: string;
  tooltipStyle?: string;
  value: number | string;
  label?: string;
  name: string;
  updateValue?: Function;
  placeholder?: string;
  infoTooltip?: string;
  mandatory?: boolean;
  password?: boolean;
  limit?: number;
  hasError?: boolean;
  disabled?: boolean;
}

export default class UiInput extends Component<UiInputArgs> {
  guid = guidFor(this);
  @tracked actualSize: number = 0;
  @tracked showPassword: boolean = false;
  @tracked containerStyle: string = 'w-full';
  @tracked labelStyle: string = 'text-gray-800 font-semibold mb-1 block';
  @tracked inputStyle: string =
    'bg-gray-200 outline-none transition-all duration-200 rounded-full border-2 border-gray-200 pt-1.5 pb-1.5 px-3 font-semibold text-gray-700 focus:outline-none focus:border-gray-600 focus:ring-0 w-full';
  @tracked passwordStyle: string =
    'w-5 absolute h-full flex top-0 items-center right-4';
  @tracked limitStyle: string = 'text-gray-500 text-sm mt-1';
  @tracked tooltipStyle: string = 'text-gray-500 text-sm mt-1';

  constructor(owner: unknown, args: UiInputArgs) {
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

    if (args.containerStyle) this.containerStyle = args.containerStyle;
    if (args.labelStyle) this.labelStyle = args.labelStyle;
    if (args.inputStyle) this.inputStyle = args.inputStyle;
    if (args.passwordStyle) this.passwordStyle = args.passwordStyle;
    if (args.limitStyle) this.limitStyle = args.limitStyle;
    if (args.tooltipStyle) this.tooltipStyle = args.tooltipStyle;
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

  @action
  togglePassword() {
    this.showPassword = !this.showPassword;
    const input = document.getElementById(this.guid);
    if (this.showPassword) {
      input?.setAttribute('type', 'text');
    } else {
      input?.setAttribute('type', 'password');
    }
  }
}
