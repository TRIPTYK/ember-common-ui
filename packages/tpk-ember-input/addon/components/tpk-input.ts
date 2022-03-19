/* eslint-disable no-unused-vars */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export interface TpkInputArgs {
  classLess?: boolean;
  label?: string;
  type?: string;
  value: string;
  onChange?: (value: string, e: Event) => unknown;
  onInput?: (value: string, e: Event) => unknown;
}

export default class TpkInput<T extends TpkInputArgs> extends Component<T> {
  guid = guidFor(this);
}
