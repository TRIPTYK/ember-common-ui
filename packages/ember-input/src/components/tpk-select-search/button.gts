import { on } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export interface TpkSelectSearchButtonSignature {
  Args: {
    guid: string;
    optionListId: string;
    isOpen: boolean;
    selected: unknown;
    labelId: string;
    activeChild?: HTMLElement;
    onSelectButtonClick: () => void;
    classless?: boolean;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [unknown];
  };
}

export default class TpkSelectSearchButtonComponent extends Component<TpkSelectSearchButtonSignature> {
  guid = guidFor(this);

  <template>
    <div
      aria-controls={{@optionListId}}
      aria-expanded='{{@isOpen}}'
      aria-labelledby={{@labelId}}
      aria-haspopup='listbox'
      role='combobox'
      tabindex='-1'
      id={{this.guid}}
      {{on 'click' @onSelectButtonClick}}
      class={{unless @classless 'tpk-select-search-button'}}
      ...attributes
    >
      {{yield @selected}}
    </div>
  </template>
}
