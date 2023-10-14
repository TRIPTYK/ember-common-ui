import Component from '@glimmer/component';

export interface TpkInputLabelComponentSignature {
  Args: {
    guid: string;
    label: string;
    classless?: boolean;
  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [string] | [];
  };
}

export default class TpkInputLabelComponent extends Component<TpkInputLabelComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-input/label': typeof TpkInputLabelComponent;
  }
}
