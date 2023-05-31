import { action } from '@ember/object';
import TpkSelect, {
  moveOperations,
  SelectActions,
  TpkSelectArgs,
} from './tpk-select';

export interface TpkSelectSearchArgs extends TpkSelectArgs<unknown> {
  onInput: (value: string) => unknown;
}

export default class TpkSelectSearch extends TpkSelect<TpkSelectSearchArgs> {
  protected keyToOpenSelectAction: { [key: string]: SelectActions } = {
    ArrowUp: SelectActions.Previous,
    ArrowDown: SelectActions.Next,
    PageUp: SelectActions.PageUp,
    PageDown: SelectActions.PageDown,
    Escape: SelectActions.Close,
    Enter: SelectActions.CloseSelect,
    Tab: SelectActions.CloseSelect,
  };

  @action
  onInput(e: Event) {
    this.isOpen = true;
    this.args.onInput((e.target as HTMLInputElement).value);
  }

  protected navigate(
    action:
      | keyof typeof moveOperations
      | SelectActions.First
      | SelectActions.Last
  ) {
    if (action === SelectActions.First) {
      this.activeChildIndex = 0;
      return;
    }

    if (action === SelectActions.Last) {
      this.activeChildIndex = this.children.length - 1;
      return;
    }

    if (this.activeChildIndex === undefined) {
      this.activeChildIndex = 0;
      return;
    }

    let value = moveOperations[action];

    const res = this.activeChildIndex + value;

    if (res > this.args.options.length - 1) {
      this.activeChildIndex = 0;
    } else if (res < 0) {
      this.activeChildIndex = this.args.options.length - 1;
    } else if (res === 0) {
      this.activeChildIndex = 0;
    } else {
      this.activeChildIndex = res;
    }
  }
}
