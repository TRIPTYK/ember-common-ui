import { action } from '@ember/object';
import TpkSelect, { TpkSelectArgs } from './tpk-select';

export interface TpkSelectSearchArgs extends TpkSelectArgs<unknown> {
  onInput: (value: string) => unknown;
}

export default class TpkSelectSearch extends TpkSelect<TpkSelectSearchArgs> {
  @action
  onInput(e: Event) {
    this.isOpen = true;
    this.args.onInput((e.target as HTMLInputElement).value);
  }
}
