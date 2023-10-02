import Component from '@glimmer/component';

interface TpkFileLabelComponentSignature {
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

export default class TpkFileLabelComponent extends Component<TpkFileLabelComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-file/label': typeof TpkFileLabelComponent;
  }
}
