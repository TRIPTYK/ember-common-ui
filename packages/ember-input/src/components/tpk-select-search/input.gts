import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

export interface TpkSelectSearchInputComponentSignature {
  Args: {
    classless?: boolean;
    registerControllerDiv: (element: HTMLDivElement) => void;
    onClick: () => void;
    onInput: (event: Event) => void;
    isOpen: boolean;
    activeChild?: HTMLElement;
    optionListId?: string;
    selectedText?: string;
  };
  Element: HTMLInputElement;
}

export default class TpkSelectSearchInputComponent extends Component<TpkSelectSearchInputComponentSignature> {
  guid = guidFor(this);

  @action keyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  <template>
    <input
      {{didInsert @registerControllerDiv}}
      id={{this.guid}}
      {{on 'click' @onClick}}
      class={{unless @classless 'tpk-select-search-input'}}
      {{on 'input' @onInput}}
      type='text'
      aria-autocomplete='none'
      aria-expanded='{{@isOpen}}'
      aria-activedescendant='{{@activeChild.id}}'
      aria-controls={{@optionListId}}
      {{on 'keydown' this.keyDown}}
      ...attributes
      value={{@selectedText}}
    />
  </template>
}
