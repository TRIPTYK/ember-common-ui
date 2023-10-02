import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export interface TpkSelectOptionSignature {
  Args: {
    guid?: string;
    multiple?: boolean;
    activeChild?: HTMLElement;
    onChange: (
      newSelected: unknown | string,
      alreadySelected: boolean,
    ) => unknown;
    labelId?: string;
    selected: unknown;
    classless?: boolean;
    options: unknown[];
    refreshChildren: (element: HTMLUListElement, options: unknown[]) => void;
  };
  Element: HTMLUListElement;
  Blocks: {
    default: [unknown];
  };
}

export default class TpkSelectOptionsComponent extends Component<TpkSelectOptionSignature> {
  guid = guidFor(this);
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-select/options': typeof TpkSelectOptionsComponent;
  }
}
