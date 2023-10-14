import Component from '@glimmer/component';

export interface TpkCheckboxInputComponentSignature {
  Args: {
    guid: string;
    classless?: boolean;
    value?: string;
    checked?: boolean;
    disabled?: boolean;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLInputElement;
}

export default class TpkCheckboxInputComponent extends Component<TpkCheckboxInputComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-checkbox/input': typeof TpkCheckboxInputComponent;
  }
}
