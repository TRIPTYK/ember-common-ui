import Component from '@glimmer/component';

interface TpkSelectContainerOptionsOptionArgs<T = unknown> {
  multiple?: boolean;
  option: T;
  selected?: (T | undefined) | T[];
}

export default class TpkSelectContainerOptionsOption<T> extends Component<
  TpkSelectContainerOptionsOptionArgs<T>
> {
  get isSelected() {
    if (this.args.multiple === true) {
      return (this.args.selected as T[]).includes(this.args.option);
    }
    return (this.args.selected as T | undefined) === this.args.option;
  }
}
