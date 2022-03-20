/* eslint-disable no-unused-vars */
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseUIComponent, BaseUIComponentArgs, HtmlInputEvent } from './base';

interface TpkFileArgs extends BaseUIComponentArgs {
  accept?: string;
}

export default class TpkFile extends BaseUIComponent<TpkFileArgs> {
  @tracked files?: FileList | null = null;

  @action onChange(e: HtmlInputEvent) {
    e.preventDefault();
    this.files = e.target?.files;
    this.args.onChange?.(e.target?.files, e);
  }
}
