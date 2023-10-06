import { assert } from '@ember/debug';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';

export interface TableGenericSearchBarComponentArgs {
  onChange?: (value: string, e: Event) => unknown;
  onSearch: (value: string, e: Event) => unknown;
  label: string;
  placeholder?: string;
  inputClass?: string;
  disabled?: boolean;
}

export interface TableGenericSearchBarComponentSignature {
  Args: TableGenericSearchBarComponentArgs;
  Element: HTMLDivElement;
}

export default class TableGenericSearchBarComponent extends Component<TableGenericSearchBarComponentSignature> {
  @tracked searchValue = '';

  constructor(owner: unknown, args: TableGenericSearchBarComponentArgs) {
    super(owner, args);
    assert(
      'Please provide @onSearch to search input',
      args.onSearch !== undefined,
    );
  }

  @action
  updateSearchValue(v: string | number | Date | null) {
    if (v === null) {
      v = '';
    }
    this.searchValue = v.toString();
  }

  @action
  onSearch(e: Event) {
    // prevent to submit form
    e.preventDefault();
    this.args.onSearch(this.searchValue, e);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic/search-bar': typeof TableGenericSearchBarComponent;
    'TableGeneric::SearchBar': typeof TableGenericSearchBarComponent;
  }
}
