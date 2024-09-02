import { on } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export interface TpkSelectResetButtonSignature {
  Args: {
    onReset: (event: Event) => void;
  };
  Element: HTMLButtonElement;
  Blocks: {
    default: [];
  };
}

export default class TpkSelectResetButtonComponent extends Component<TpkSelectResetButtonSignature> {
  guid = guidFor(this);

  <template>
    <button
      id={{this.guid}}
      type='button'
      class='tpk-select-reset-button'
      {{on 'click' @onReset}}
    >
      {{yield}}
    </button>
  </template>
}
