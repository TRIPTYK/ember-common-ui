import Component from '@glimmer/component';

export interface TpkCheckboxLabelComponentSignature {
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

export default class TpkCheckboxLabelComponent extends Component<TpkCheckboxLabelComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-checkbox/label': typeof TpkCheckboxLabelComponent;
  }
}
