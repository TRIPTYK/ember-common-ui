import Component from '@glimmer/component';

export interface TpkInputLabelComponentSignature {
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

export default class TpkDatepickerLabelComponent extends Component<TpkInputLabelComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-datepicker/label': typeof TpkDatepickerLabelComponent;
  }
}
