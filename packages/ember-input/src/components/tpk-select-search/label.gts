import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

export interface TpkSelectSearchLabelSignature {
  Args: {
    label: string;
    classless?: boolean;
    registerLabel: (element: HTMLLabelElement) => void;
  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

export default class TpkSelectSearchLabelComponent extends Component<TpkSelectSearchLabelSignature> {
  guid = guidFor(this);

  <template>
    <label
      class={{unless @classless 'tpk-select-search-label'}}
      {{didInsert @registerLabel}}
      ...attributes
      id={{this.guid}}
    >
      {{#if (has-block)}}
        {{yield}}
      {{else}}
        {{@label}}
      {{/if}}
    </label>
  </template>
}
