import type { MergeDeep } from 'type-fest';
import type { BaseUIComponentArgs } from '../base';
import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import { on } from '@ember/modifier';
import TpkInputComponent from '../tpk-input.gts';

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
  performSearch = task(this, { drop: true }, async (value: string, e: Event) => {
    e.preventDefault();
    
    return this.args.onSearch(e,value);
  });

  submitSearch = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLInputElement;
    const input = form.querySelector('input');
    let value= '';
    if(input?.value){
      value = input?.value
    }
    
    this.performSearch.perform(value, e);
  };

  get labelOrDefault () {
    return this.args.label ?? '';
  }

  <template>
    <form {{ on 'submit' this.submitSearch }}>
      <TpkInputComponent 
        @label={{this.labelOrDefault}}
        @placeholder={{@placeholder}}
        @type="search"
      as |C|>
        <div class="tpk-search" data-test-tpk-prefab-search-container ...attributes>
          <C.Label class="tpk-search-label">
            {{#if this.performSearch.isRunning}}
              <div class="tpk-search-button">
                <i class="tpk-search-loader"></i>
              </div>
            {{else}}
            <button type="submit" data-test-search-submit>
              <img
                src='/assets/icons/search.svg'
                data-test-tpk-search-icon
                alt='magnyfying glass'
                class='tpk-search-button'
              />
            </button>
            {{/if}}
            <C.Input class="tpk-search-input" />
          </C.Label>
        </div>
      </TpkInputComponent>
    </form>
  </template>
}

