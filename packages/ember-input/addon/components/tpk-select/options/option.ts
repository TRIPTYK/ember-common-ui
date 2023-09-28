import Component from '@glimmer/component';

export interface TpkSelectContainerOptionsOptionArgs<T = unknown> {
  multiple?: boolean;
  option: T;
  selected?: (T | undefined) | T[];
  activeChild?: HTMLElement;
  guid: string;
  index: number;
}

export default class TpkSelectContainerOptionsOption<T> extends Component<
  TpkSelectContainerOptionsOptionArgs<T>
> {
  get id() {
    return `${this.args.guid}-listbox-option-${this.args.index}`;
  }

  get isSelected() {
    if (this.args.multiple === true) {
      return (this.args.selected as T[]).includes(this.args.option);
    }
    return (this.args.selected as T | undefined) === this.args.option;
  }

  get hasVirtualFocus() {
    return this.args.activeChild?.id === this.id;
  }
}
