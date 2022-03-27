/* eslint-disable no-unused-vars */
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';

export interface TpkInputArgs extends BaseUIComponentArgs {
  type?: string;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkInput<
  T extends TpkInputArgs
> extends BaseUIComponent<T> {
  @action onChange(e: HtmlInputEvent): void {
    this.args.onChange?.(e.target?.value, e);
  }
}
