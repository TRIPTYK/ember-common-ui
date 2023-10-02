import Component from '@glimmer/component';

interface TpkInputLabelComponentSignature {
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

export default class TpkInputLabelComponent extends Component<TpkInputLabelComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-input/label': typeof TpkInputLabelComponent;
  }
}
