import { action } from '@ember/object';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';

interface UiTextareaArgs extends BaseUIComponentArgs {}

export default class UiTextarea extends BaseUIComponent<UiTextareaArgs> {
  @action
  onChange(e: HtmlInputEvent) {
    e.preventDefault();
    const { value } = e.target!;
    this.args.onChange?.(value);
  }
}
