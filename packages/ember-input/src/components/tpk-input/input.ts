import Component from '@glimmer/component';

interface TpkInputInputComponentSignature {
  Args: {
    guid: string;
    type?: string;
    classless?: boolean;
    disabled?: boolean;
    value?: string | number | boolean | null | undefined;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLInputElement;
  Blocks: {
    default: [];
  };
}

export default class TpkInputInputComponent extends Component<TpkInputInputComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-input/input': typeof TpkInputInputComponent;
  }
}
