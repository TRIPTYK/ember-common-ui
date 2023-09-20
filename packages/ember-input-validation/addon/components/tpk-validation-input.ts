import { action } from '@ember/object';
import { BaseValidationArgs, BaseValidationComponent } from './base';

interface TpkValidationInputArgs extends BaseValidationArgs {}

export default class TpkValidationInput extends BaseValidationComponent<TpkValidationInputArgs> {
  @action onChange(value: string) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }
}
