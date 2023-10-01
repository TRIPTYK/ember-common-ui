import Component from '@glimmer/component';

interface TpkTextareaInputComponentSignature {
  Args: {
    guid: string;
    classless?: boolean;
    value?: string;
    disabled?: boolean;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLTextAreaElement;
}

export default class TpkTextareaInputComponent extends Component<TpkTextareaInputComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-textarea/input': typeof TpkTextareaInputComponent;
  }
}
