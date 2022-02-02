import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiCheckboxArgs {
  label: string;
  labelStyle: string;
  checkboxStyle: string;
  containerStyle: string;
  name: string;
  value: string;
  checked: boolean;
  imageUrl: string;
  // eslint-disable-next-line no-unused-vars
  updateValue: (value: boolean) => void;
}

export default class UiCheckbox extends Component<UiCheckboxArgs> {
  defaultLabelStyle = 'pb-0.5 cursor-pointer select-none  ';
  defaultContainerStyle = 'flex items-center';
  defaultCheckboxStyle =
    'cursor-pointer mr-2 appearance-none bg-gray-300 h-4 w-4 rounded';
  guid = guidFor(this);

  get containerStyles() {
    return this.args.containerStyle ?? this.defaultContainerStyle;
  }
  get checkboxStyles() {
    return this.args.checkboxStyle ?? this.defaultCheckboxStyle;
  }
  get labelStyles() {
    return this.args.labelStyle ?? this.defaultLabelStyle;
  }
  get image() {
    return `background-image: url("${
      this.args.imageUrl ??
      `data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' xmlns:serif='http://www.serif.com/' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;'%3E%3Cg%3E%3Cpath d='M7,14.17l-4.17,-4.17l-1.41,1.41l5.58,5.59l12,-12l-1.41,-1.42l-10.59,10.59Z' style='fill:%23fff;fill-rule:nonzero;'/%3E%3C/g%3E%3C/svg%3E`
    }");background-size:cover;`;
  }

  @action
  toggleCheck(e: Event) {
    const checked = (e.target as HTMLInputElement)?.checked;
    if (this.args.updateValue) this.args.updateValue(checked);
  }
}
