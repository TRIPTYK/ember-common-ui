/* eslint-disable no-unused-vars */
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface TpkFileArgs {
  onUpload?: (files: FileList | null, e: Event) => unknown;
  accept?: string;
}

interface HtmlInputFileEvent extends Event {
  target: HTMLInputElement;
}

export default class TpkFile extends Component<TpkFileArgs> {
  guid = guidFor(this);
  @tracked files: FileList | null = null;

  @action change(e: HtmlInputFileEvent) {
    e.preventDefault();
    this.files = e.target?.files;
    this.args.onUpload?.(e.target?.files, e);
  }
}
