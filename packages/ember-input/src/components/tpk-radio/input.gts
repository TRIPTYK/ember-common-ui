import { on } from '@ember/modifier';
import Component from '@glimmer/component';

export interface TpkRadioInputComponentSignature {
  Args: {
    name: string;
    guid: string;

    value?: string;
    selected: unknown;
    disabled?: boolean;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLInputElement;
  Blocks: {
    default: unknown[];
  };
}

export default class TpkRadioInputComponent extends Component<TpkRadioInputComponentSignature> {
  get isChecked(): boolean {
    return this.args.value === this.args.selected;
  }

  <template>
    <input
      class='tpk-radio-input'
      id={{@guid}}
      name={{@name}}
      value={{@value}}
      checked={{this.isChecked}}
      disabled={{@disabled}}
      type='radio'
      {{on @changeEvent @onChange}}
      ...attributes
      data-test-tpk-radio-input
    />
  </template>
}
