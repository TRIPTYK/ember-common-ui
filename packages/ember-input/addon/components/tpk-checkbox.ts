/* eslint-disable no-unused-vars */
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';

interface UiCheckboxArgs extends BaseUIComponentArgs {}

export default class UiCheckbox extends BaseUIComponent<UiCheckboxArgs> {
  @action
  public onChange(e: HtmlInputEvent) {
    e.preventDefault();
    this.args.onChange?.(e.target!.checked, e.target!.value, e);
  }
}
