import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export interface TpkSelectSearchButtonSignature {
  Args: {
    guid: string;
    optionListId: string;
    isOpen: boolean;
    selected: unknown;
    labelId: string;
    activeChild?: HTMLElement;
    onSelectButtonClick: () => void;
    classless?: boolean;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [unknown];
  };
}

export default class TpkSelectSearchButtonComponent extends Component<TpkSelectSearchButtonSignature> {
  guid = guidFor(this);
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-select-search/button': typeof TpkSelectSearchButtonComponent;
  }
}
