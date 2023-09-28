/* eslint-disable no-unused-vars */
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';

interface UiRadioArgs extends BaseUIComponentArgs {
  checked: string;
  value: string | undefined;
  name: string;
}

export default class UiRadio extends BaseUIComponent<UiRadioArgs> {
  constructor(owner: unknown, args: UiRadioArgs) {
    super(owner, args);
    assert('@name is required', args.name !== undefined);
    assert('@value is required', args.value !== undefined);
    assert('@label is required', args.label !== undefined);
  }

  @action
  public onChange(e: HtmlInputEvent) {
    e.preventDefault();
    this.args.onChange?.(e.target!.value, e);
  }
}
