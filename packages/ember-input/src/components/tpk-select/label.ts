import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface TpkSelectLabelComponentSignature {
  Args: {
    guid: string;
    label: string;
    classless?: boolean;
    registerLabel: (label: HTMLLabelElement) => void;
  };
  Element: HTMLLabelElement;
  Blocks: {
    default: [];
  };
}

export default class TpkSelectLabelComponent extends Component<TpkSelectLabelComponentSignature> {
  guid = guidFor(this);
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-select/label': typeof TpkSelectLabelComponent;
  }
}
