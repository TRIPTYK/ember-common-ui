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
  onSelect: (newSelected: T, alreadySelected: boolean) => unknown;
}

export default class TpkSelect<T = unknown> extends Component<
  TpkSelectArgs<T>
> {
  @tracked isOpen = false;
  guid = guidFor(this);

  @action
  clickOutside() {
    this.isOpen = false;
  }

  @action
  rm(e: Event) {
    console.log(e);
  }

  @action
  onSelectButtonClick() {
    this.isOpen = !this.isOpen;
  }

  @action
  onSelect(e: T, alreadySelected: boolean) {
    this.isOpen = false;
    this.args.onSelect(e, alreadySelected);
  }

  get hasSelection() {
    return this.args.multiple
      ? (this.args.selected as T[]).length > 0
      : this.args.selected === undefined;
  }

  get selectedIndex() {
    if (!this.args.selected) {
      return -1;
    }
    return this.args.options.findIndex((e) => e === this.args.selected);
  }
}
