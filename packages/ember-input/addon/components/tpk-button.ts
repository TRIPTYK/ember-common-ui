import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { BaseUIComponentArgs } from './base';

interface TpkButtonArgs extends BaseUIComponentArgs {
  onClick?: (e: Event) => unknown
}

export default class TpkButton extends Component<TpkButtonArgs> {
  guid = guidFor(this);

  @action
  onClick(e: Event) {
    return this.args.onClick?.(e);
  }
}
