import { assert } from '@ember/debug';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface TableGenericSearchBarComponentArgs {
  onChange?: (value: string, e: Event) => unknown;
  onSearch: (value: string, e: Event) => unknown;
}

export default class TableGenericSearchBarComponent extends Component<TableGenericSearchBarComponentArgs> {
  @tracked searchValue = '';

  constructor(owner: unknown, args: TableGenericSearchBarComponentArgs) {
    super(owner, args);
    assert(
      'Please provide @onSearch to search input',
      args.onSearch !== undefined
    );
  }

  @action
  updateSearchValue(v: string) {
    this.searchValue = v;
  }

  @action
  onSearch(e: Event) {
    // prevent to submit form
    e.preventDefault();
    this.args.onSearch(this.searchValue, e);
  }
}
