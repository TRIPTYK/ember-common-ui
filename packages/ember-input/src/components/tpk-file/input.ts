import Component from '@glimmer/component';

interface TpkFileInputComponentSignature {
  Args: {
    guid: string;
    classless?: boolean;
    accept?: string;
    disabled?: boolean;
    multiple?: boolean;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLInputElement;
}

export default class TpkFileInputComponent extends Component<TpkFileInputComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-file/input': typeof TpkFileInputComponent;
  }
}
