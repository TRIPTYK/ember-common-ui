import { action } from '@ember/object';
import Component from '@glimmer/component';

interface TpkSelectContainerSearchbarArgs<T = unknown> {
  options: T[];
  selected: T;
  // eslint-disable-next-line no-unused-vars
  onSearch: (searchValue: string) => void;
}

export default class TpkSelectContainerSearchbar extends Component<TpkSelectContainerSearchbarArgs> {
  @action
  search(e: Event) {
    e.preventDefault();
    this.args.onSearch?.((e.target as HTMLInputElement).value);
  }
}
