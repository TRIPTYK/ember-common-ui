import { action } from '@ember/object';
import Component from '@glimmer/component';

interface UiModalContentArgs {
  onClose: () => void;
  onClickOutside?: (_e: PointerEvent) => void;
}

export default class UiModalContent extends Component<UiModalContentArgs> {
  @action
  public onClickOutside(e: PointerEvent) {
    console.log(this.args.onClickOutside ?? this.args.onClose);
    return this.args.onClickOutside?.(e) ?? this.args.onClose();
  }
}
