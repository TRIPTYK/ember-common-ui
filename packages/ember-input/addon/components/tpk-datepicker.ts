/* eslint-disable no-unused-vars */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { BaseUIComponentArgs } from './base';

export interface TpkDatepickerArgs extends BaseUIComponentArgs {
  type?: string;
  dateFormat?: string;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkDatepicker<
  T extends TpkDatepickerArgs
> extends Component<T> {
  guid = guidFor(this);

  get dateFormat() {
    return this.args.dateFormat ? this.args.dateFormat : 'd/m/Y';
  }
}
