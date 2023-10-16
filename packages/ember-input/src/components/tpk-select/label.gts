import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

export interface TpkSelectLabelComponentSignature {
  Args: {
    guid: string;
    label: string;
    classless?: boolean;
    registerLabel: (label: HTMLLabelElement) => void;
  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

export default class TpkSelectLabelComponent extends Component<TpkSelectLabelComponentSignature> {
  guid = guidFor(this);

  <template>
    <label
      class={{unless @classless 'tpk-select-label'}}
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
