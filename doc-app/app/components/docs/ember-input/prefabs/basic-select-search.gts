import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import TpkSelectCreate from '@triptyk/ember-input/components/tpk-select-create';

export default class BasicSelectSearchExample extends Component {
  @tracked searchOptions = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
  ];

  @tracked selection = '';

  @action
  onChange(value: unknown) {
    this.selection = value as string;
  }

  @action
  onCreate(value: unknown) {
    const newOption = value as string;
    this.searchOptions = [...this.searchOptions, newOption];
    this.selection = newOption;
  }

  @action
  search(term: string) {
    if (!term) {
      return this.searchOptions;
    }
    return this.searchOptions.filter((option) =>
      String(option).toLowerCase().includes(term.toLowerCase())
    );
  }

  <template>
    <div class="tpk-select-search-container">
      <TpkSelectCreate
        @options={{this.searchOptions}}
        @selected={{this.selection}}
        @onChange={{this.onChange}}
        @onCreate={{this.onCreate}}
        @search={{this.search}}
        @multiple={{true}}
        @searchEnabled={{true}}
        @label="Search for a fruit:"
        as |S|
      >
        <S.Option as |opt|>
          {{opt.option}}
        </S.Option>
      </TpkSelectCreate>
    </div>
  </template>
}
