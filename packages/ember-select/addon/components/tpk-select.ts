import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';

export interface TpkSelectArgs<T> {
  options: T[];
  selected: (T | undefined) | T[];
  multiple?: boolean;
  label?: string;
  classless?: boolean;
  defaultText?: string;
  // eslint-disable-next-line no-unused-vars
  onSearch: (searchString: string) => unknown;
  // eslint-disable-next-line no-unused-vars
  onChange: (newSelected: T, alreadySelected: boolean) => unknown;
}

export default class TpkSelect<T = unknown> extends Component<
  TpkSelectArgs<T>
> {
  @tracked isOpen = false;
  guid = guidFor(this);

  constructor(owner: unknown, args: TpkSelectArgs<T>) {
    super(owner, args);
    assert(
      'Please provide an @options array to component',
      args.options !== undefined
    );
    assert(
      'Please provide an @onChange function',
      typeof args.onChange === 'function'
    );
    if (this.args.multiple === true) {
      assert(
        'Please provide an array for @selected',
        Array.isArray(args.selected)
      );
    }
  }

  @action
  clickOutside() {
    this.isOpen = false;
  }

  @action
  onSelectButtonClick() {
    this.isOpen = !this.isOpen;
  }

  @action
  onChange(e: T, alreadySelected: boolean) {
    this.isOpen = false;
    this.args.onChange(e, alreadySelected);
  }

  get hasSelection() {
    return this.args.multiple === true
      ? (this.args.selected as T[]).length > 0
      : !!this.args.selected;
  }
}
