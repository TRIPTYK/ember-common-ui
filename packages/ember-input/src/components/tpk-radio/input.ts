import Component from '@glimmer/component';

interface TpkRadioInputComponentSignature {
  Args: {
    name: string;
    guid: string;
    classless?: boolean;
    value?: string;
    selected: unknown;
    disabled?: boolean;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLInputElement;
}

export default class TpkRadioInputComponent extends Component<TpkRadioInputComponentSignature> {
  get isChecked(): boolean {
    return this.args.value === this.args.selected;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-radio/input': typeof TpkRadioInputComponent;
  }
}
