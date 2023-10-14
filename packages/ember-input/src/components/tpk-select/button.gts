import { on } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

export interface TpkSelectButtonSignature {
  Args: {
    optionListId?: string;
    isOpen: boolean;
    selected: unknown;
    labelId: string;
    activeChild?: HTMLElement;
    onSelectButtonClick: () => void;
    classless?: boolean;
    registerControllerDiv: (element: HTMLDivElement) => void;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [unknown];
  };
}

export default class TpkSelectButtonComponent extends Component<TpkSelectButtonSignature> {
  guid = guidFor(this);

  <template>
    <div
      aria-controls={{@optionListId}}
      aria-expanded='{{@isOpen}}'
      aria-labelledby={{@labelId}}
      aria-haspopup="listbox"
      role='combobox'
      id={{this.guid}}
        aria-activedescendant='{{@activeChild.id}}'
      tabindex='0'
      {{on 'click' @onSelectButtonClick}}
      class={{unless @classless 'tpk-select-button'}}
      {{didInsert @registerControllerDiv}}
      ...attributes
    >
      {{yield @selected}}
    </div>
  </template>
}
