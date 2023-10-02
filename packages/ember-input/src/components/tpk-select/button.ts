import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export interface TpkSelectButtonSignature {
  Args: {
    optionListId?: string;
    isOpen: boolean;
    selected: unknown;
    labelId: string;
    activeChild?: HTMLElement;
    onSelectButtonClick: () => void;
    classless?: boolean;
    registerControllerDiv: (element: HTMLDivElement) => void;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [unknown];
  };
}

export default class TpkSelectButtonComponent extends Component<TpkSelectButtonSignature> {
  guid = guidFor(this);
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-select/button': typeof TpkSelectButtonComponent;
  }
}
