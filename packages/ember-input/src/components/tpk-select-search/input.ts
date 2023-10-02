import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface TpkSelectSearchInputComponentSignature {
  Args: {
    classless?: boolean;
    registerControllerDiv: (element: HTMLDivElement) => void;
    onClick: () => void;
    onInput: (event: Event) => void;
    isOpen: boolean;
    activeChild?: HTMLElement;
    optionListId?: string;
    selectedText?: string;
  };
  Element: HTMLInputElement;
}

export default class TpkSelectSearchInputComponent extends Component<TpkSelectSearchInputComponentSignature> {
  guid = guidFor(this);

  @action keyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-select-search/input': typeof TpkSelectSearchInputComponent;
  }
}
