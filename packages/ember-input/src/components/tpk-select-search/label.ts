import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export interface TpkSelectSearchLabelSignature {
  Args: {
    label: string;
    classless?: boolean;
    registerLabel: (element: HTMLLabelElement) => void;
  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

export default class TpkSelectSearchLabelComponent extends Component<TpkSelectSearchLabelSignature> {
  guid = guidFor(this);
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-select-search/label': typeof TpkSelectSearchLabelComponent;
  }
}
