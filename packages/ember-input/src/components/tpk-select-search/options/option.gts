import { on } from '@ember/modifier';
import TpkSelectContainerOptionsOption, {
  type TpkSelectContainerOptionsOptionArgs,
} from '../../tpk-select/options/option';
import { fn, hash } from '@ember/helper';

export interface TpkSelectSearchContainerOptionsOptionArgs
  extends TpkSelectContainerOptionsOptionArgs {}

export default class TpkSelectSearchOptionsOption extends TpkSelectContainerOptionsOption {
  <template>
    <li
      {{on 'click' (fn @onChange @option this.isSelected)}}
      id={{this.id}}
      aria-selected='{{this.isSelected}}'
      role='option'
      class={{unless @classless 'tpk-select-search-options-option'}}
      data-has-focus='{{this.hasVirtualFocus}}'
      data-test-option={{@index}}
      ...attributes
    >
      {{yield (hash option=@option isSelected=this.isSelected)}}
    </li>
  </template>
}
