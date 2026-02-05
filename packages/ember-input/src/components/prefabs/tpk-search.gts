import type { MergeDeep } from 'type-fest';
import type { BaseUIComponentArgs } from '../base';
import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import { on } from '@ember/modifier';
import TpkInputComponent from '../tpk-input.gts';
import SearchIcon from '../../assets/icons/search.gts';

export type TpkSearchPrefabSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      placeholder?: string;
      label?: string;
      onSearch: (e: Event, value: string) => unknown;
    }
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
};

export default class TpkSearchPrefabComponent extends Component<TpkSearchPrefabSignature> {
  performSearch = task(
    this,
    { drop: true },
    // eslint-disable-next-line @typescript-eslint/require-await
    async (value: string, e: Event) => {
      e.preventDefault();

      return this.args.onSearch(e, value);
    },
  );

  submitSearch = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input');
    let value = '';
    if (input?.value) {
      value = input?.value;
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.performSearch.perform(value, e);
  };

  get labelOrDefault() {
    return this.args.label ?? '';
  }

  <template>
    <form {{on 'submit' this.submitSearch}}>
      <TpkInputComponent
        @label={{this.labelOrDefault}}
        @placeholder={{@placeholder}}
        @type='search'
        as |C|
      >
        <C.Label class='tpk-search'>
          {{#if this.performSearch.isRunning}}
            <div class='tpk-search-icon'>
              <i class='tpk-search-loader'></i>
            </div>
          {{else}}
            <button
              type='submit'
              class='tpk-search-icon-button'
              data-test-search-submit
            >
              <SearchIcon class='tpk-search-icon' data-test-tpk-search-icon />
            </button>
          {{/if}}
          <C.Input class='tpk-search-input' />
        </C.Label>
      </TpkInputComponent>
    </form>
  </template>
}
