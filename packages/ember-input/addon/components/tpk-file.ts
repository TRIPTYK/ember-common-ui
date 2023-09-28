import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';

interface TpkFileArgs extends BaseUIComponentArgs {
  accept?: string;
  value: string | unknown;
}

export default class TpkFile extends BaseUIComponent<TpkFileArgs> {
  @tracked files: File[] = [];

  @action onChange(e: HtmlInputEvent) {
    e.preventDefault();
    const files = Array.from(e.target!.files ?? []);
    this.files = files;
    this.args.onChange?.(files, e);
  }
}
