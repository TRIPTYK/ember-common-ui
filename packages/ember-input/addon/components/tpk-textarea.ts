import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';

interface UiTextareaArgs extends BaseUIComponentArgs {}

export default class UiTextarea extends BaseUIComponent<UiTextareaArgs> {
  constructor(owner: unknown, args: UiTextareaArgs) {
    super(owner, args);
    assert('@value is required', args.value !== undefined);
  }

  @action
  onChange(e: HtmlInputEvent) {
    e.preventDefault();
    const { value } = e.target!;
    this.args.onChange?.(value);
  }
}
