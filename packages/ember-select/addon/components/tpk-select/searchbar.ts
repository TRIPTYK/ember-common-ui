import { action } from '@ember/object';
import Component from '@glimmer/component';

interface TpkSelectContainerSearchbarArgs<T = unknown> {
  options: T[];
  selected: T;
  isOpen: boolean;

  onSearch: (searchValue: string) => void;
}

export default class TpkSelectContainerSearchbar extends Component<TpkSelectContainerSearchbarArgs> {
  @action
  /**
   * Focus on deploy
   */
  focus(e: HTMLElement, [isOpen]: [boolean]) {
    if (isOpen) {
      e.focus();
    }
  }

  @action
  search(e: Event) {
    e.preventDefault();
    this.args.onSearch?.((e.target as HTMLInputElement).value);
  }
}
