import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import tpkFocusTrap from '@triptyk/ember-input/modifiers/focus-trap';

interface UiModalContentArgs {
  onClose: () => void;

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

  <template>
    <div
      data-test-tpk-modal
      class='tpk-modal-content'
      role='dialog'
      aria-labelledby={{@title}}
      {{tpkFocusTrap options=(hash allowOutsideClick=@outsideClickHandler)}}
      ...attributes
    >
      {{yield (hash guid=this.guid)}}
    </div>
  </template>
}
