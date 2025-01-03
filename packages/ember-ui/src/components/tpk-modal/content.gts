import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import tpkFocusTrap from '@triptyk/ember-input/modifiers/focus-trap';

interface UiModalContentArgs {
  onClose: () => void;
  outsideClickHandler: (e: MouseEvent | TouchEvent) => boolean;
  title?: string;
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

  <template>
    <div class='tpk-modal-content'>
    <h2 class='tpk-modal-title'>
        {{@title}}
    </h2>
    <div
      data-test-tpk-modal

      role='dialog'
      {{tpkFocusTrap options=(hash allowOutsideClick=@outsideClickHandler)}}
      ...attributes
    >
      
      {{yield (hash guid=this.guid)}}
    </div>
    </div>
  </template>
}
