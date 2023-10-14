import Component from '@glimmer/component';

export interface TpkTextareaLabelComponentSignature {
  Args: {
    guid: string;
    label: string;
    classless?: boolean;
  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

export default class TpkTextareaLabelComponent extends Component<TpkTextareaLabelComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-textarea/label': typeof TpkTextareaLabelComponent;
  }
}
