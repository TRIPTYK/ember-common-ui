import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import didUpdate from '@ember/render-modifiers/modifiers/did-update';
import TpkSelectOptionsOptionComponent from './options/option.gts';

export interface TpkSelectOptionSignature {
  Args: {
    guid?: string;
    multiple?: boolean;
    activeChild?: HTMLElement;
    onChange: (
      newSelected: unknown | string,
      alreadySelected: boolean,
    ) => unknown;
    labelId?: string;
    selected: unknown;
    classless?: boolean;
    options: unknown[];
    refreshChildren: (element: HTMLUListElement, options: unknown[]) => void;
  };
  Element: HTMLUListElement;
  Blocks: {
    default: [unknown];
  };
}

export default class TpkSelectOptionsComponent extends Component<TpkSelectOptionSignature> {
  guid = guidFor(this);

  <template>
    <ul
      tabindex='-1'
      role='listbox'
      aria-multiselectable={{@multiple}}
      id={{this.guid}}
      aria-labelledby={{@labelId}}
      class={{unless @classless 'tpk-select-options'}}
      {{didInsert @refreshChildren @options}}
      {{didUpdate @refreshChildren @options}}
      ...attributes
    >
      {{#each @options as |o i|}}
        {{yield
          (component
            TpkSelectOptionsOptionComponent
            option=o
            guid=@guid
            selected=@selected
            index=i
            multiple=@multiple
            activeChild=@activeChild
            onChange=@onChange
          )
        }}
      {{/each}}
    </ul>
  </template>
}
