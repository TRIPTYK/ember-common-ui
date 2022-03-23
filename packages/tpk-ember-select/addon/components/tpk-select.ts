import Component from '@glimmer/component';

interface TpkSelectArgs<T = unknown> {
  options: T[];
  selected: T;
  label?: string;
  classless?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (selected: T) => unknown;
}

export default class TpkSelect extends Component<TpkSelectArgs> {
  get selected() {
    if (!this.args.selected) {
      return this.args.options[0];
    }
    return this.args.options.find((e) => e === this.args.selected);
  }

  get selectedIndex() {
    if (!this.args.selected) {
      return -1;
    }
    return this.args.options.findIndex((e) => e === this.args.selected);
  }
}
