import Component from '@glimmer/component';

export interface TpkRadioLabelComponentSignature {
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

export default class TpkRadioLabelComponent extends Component<TpkRadioLabelComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-radio/label': typeof TpkRadioLabelComponent;
  }
}
