import { action } from '@ember/object';
import { BaseValidationComponent, BaseValidationArgs } from './base';

interface TpkValidationTextareaArgs extends BaseValidationArgs {}

export default class TpkValidationTextarea extends BaseValidationComponent<TpkValidationTextareaArgs> {
  @action onChange(e: string) {
    if (this.args.onChange) {
      return this.args.onChange(e);
    }
    return this.args.changeset.set(this.args.validationField, e);
  }
}
