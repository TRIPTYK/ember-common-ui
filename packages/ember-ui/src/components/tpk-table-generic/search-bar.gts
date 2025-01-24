import { assert } from '@ember/debug';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import TpkSearch from '@triptyk/ember-input/components/prefabs/tpk-search';

export interface TableGenericSearchBarComponentArgs {
  onChange?: (value: string, e: Event) => unknown;
  onSearch: (value: string,) => unknown;
  label: string;
  placeholder: string;
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
  onSearch(e: Event, value: string) {
    // prevent to submit form
    e.preventDefault();

    this.args.onSearch(value);
  }

  <template>
     <TpkSearch
            @label={{@label}}
            @placeholder={{@placeholder}}
            @onSearch={{this.onSearch}}
          />
  </template>
}
