import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiModalContentArgs {
  onClose: () => void;
  classless: boolean;
}

export default class UiModalContent extends Component<UiModalContentArgs> {
  guid = guidFor(this);
}
