import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';

interface UiModalContentArgs {
  onClose: () => void;
  classless?: boolean;
  outsideClickHandler: (e: MouseEvent | TouchEvent) => boolean;
  title: string;
}

export interface UiModalContentSignature {
  Args: UiModalContentArgs;
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        guid: string;
      },
    ];
  };
}

export default class TpkModalContentComponent extends Component<UiModalContentSignature> {
  guid = guidFor(this);

  public constructor(owner: unknown, args: UiModalContentArgs) {
    super(owner, args);
    assert('UiModalContent requires a @title', args.title);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-modal/content': typeof TpkModalContentComponent;
  }
}
