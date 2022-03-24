import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

interface TpkSelectArgs<T> {
  options: T[];
  selected: T | T[];
  multiple?: boolean;
  label?: string;
  classless?: boolean;
  // eslint-disable-next-line no-unused-vars
  selectElement: (newSelected: T, alreadySelected: boolean) => unknown;
}

export default class TpkSelect<T = unknown> extends Component<
  TpkSelectArgs<T>
> {
  @tracked isOpen = false;
  guid = guidFor(this);

  @action
  selectButtonClicked() {
    this.isOpen = !this.isOpen;
  }

  @action
  selectElement(e: T, alreadySelected: boolean) {
    this.isOpen = false;
    this.args.selectElement(e, alreadySelected);
  }

  get selected(): (T | undefined) | T[] {
    if (this.args.multiple) {
      const selected = this.args.selected as T[];
      return this.args.options.filter((e) => selected.includes(e));
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
