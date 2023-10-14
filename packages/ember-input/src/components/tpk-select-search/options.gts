import TpkSelectOptionsComponent from '../tpk-select/options';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import didUpdate from '@ember/render-modifiers/modifiers/did-update';
import TpkSelectSearchOptionsOptionComponent from './options/option';

export default class TpkSelectSearchOptionsComponent extends TpkSelectOptionsComponent {
  <template>
    <ul
      role='listbox'
      aria-multiselectable={{@multiple}}
      id={{this.guid}}
      aria-labelledby={{@labelId}}
      class={{unless @classless 'tpk-select-search-options'}}
      {{didInsert @refreshChildren @options}}
      {{didUpdate @refreshChildren @options}}
      ...attributes
    >
      {{#each @options as |o i|}}
        {{yield
          (component
            TpkSelectSearchOptionsOptionComponent
            option=o
            guid=@guid
            index=i
            activeChild=@activeChild
            selected=@selected
            multiple=@multiple
            onChange=@onChange
          )
        }}
      {{/each}}
    </ul>
  </template>
}
