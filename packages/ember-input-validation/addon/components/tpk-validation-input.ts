import { action } from '@ember/object';
import { BaseValidationArgs, BaseValidationComponent } from './base';

interface TpkValidationInputArgs extends BaseValidationArgs {}

export default class TpkValidationInput extends BaseValidationComponent<TpkValidationInputArgs> {
  @action onChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    this.args.changeset.set(this.args.validationField, value);
  }
}
