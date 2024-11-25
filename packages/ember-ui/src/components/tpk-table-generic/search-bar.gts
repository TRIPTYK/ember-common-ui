import { assert } from '@ember/debug';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import t from 'ember-intl/helpers/t';
import TpkInput from '@triptyk/ember-input/components/tpk-input';

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

  <template>
    <TpkInput
      @label={{@label}}
      @value={{this.searchValue}}
      @onChange={{this.updateSearchValue}}
      @type='search'
      as |TI|
    >
      <form {{on 'submit' this.onSearch}}>
        <TI.Label>
          {{@label}}
        </TI.Label>
        <TI.Input
          disabled={{@disabled}}
          placeholder={{@placeholder}}
          class={{@inputClass}}
          aria-autocomplete='none'
          autocomplete='off'
          autofill='off'
        />
        <button type='submit' data-test-search-submit>
          <span>{{t 'global.search'}}</span>
        </button>
      </form>
    </TpkInput>
  </template>
}
