import { action } from '@ember/object';
import BaseComponent from '@glimmer/component/-private/component';
import { BaseValidationArgs } from './base';
import { htmlSafe } from '@ember/template';
import { guidFor } from '@ember/object/internals';

interface TpkValidationFroalaArgs extends BaseValidationArgs {}

export default class TpkValidationFroala extends BaseComponent<TpkValidationFroalaArgs> {
  guid = guidFor(this);
  get content() {
    return htmlSafe(this.args.changeset.get(this.args.validationField));
  }

  @action
  updateContent(content: Record<'string', string>) {
    if (this.args.onChange) {
      return this.args.onChange(content);
    }
    this.args.changeset.set(this.args.validationField, content.string);
  }
}
