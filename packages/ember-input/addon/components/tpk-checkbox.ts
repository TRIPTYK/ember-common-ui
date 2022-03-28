/* eslint-disable no-unused-vars */
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';

interface UiCheckboxArgs extends BaseUIComponentArgs {
  checked: boolean;
  value: string | undefined;
}

export default class UiCheckbox extends BaseUIComponent<UiCheckboxArgs> {
  constructor(owner: unknown, args: UiCheckboxArgs) {
    super(owner, args);
    assert('@checked is required', typeof args.checked === 'boolean');
  }

  @action
  public onChange(e: HtmlInputEvent) {
    e.preventDefault();
    this.args.onChange?.(e.target!.checked, e.target!.value, e);
  }
}
