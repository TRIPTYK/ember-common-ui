import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';

interface UiTextareaArgs extends BaseUIComponentArgs {}

export default class UiTextarea extends BaseUIComponent<UiTextareaArgs> {
  @tracked count = 0;

  @action
  onChange(e: HtmlInputEvent) {
    e.preventDefault();
    const { value } = e.target!;
    this.count = value.length;
    this.args.onChange?.(value);
  }
}
