/* eslint-disable no-unused-vars */
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';

export interface TpkInputArgs extends BaseUIComponentArgs {
  type?: string;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkInput<
  T extends TpkInputArgs
> extends BaseUIComponent<T> {
  constructor(owner: unknown, args: T) {
    super(owner, args);
    assert('@value is required', args.value !== undefined);
  }

  @action onChange(e: HtmlInputEvent): void {
    e.preventDefault();
    this.args.onChange?.(e.target?.value, e);
  }
}
