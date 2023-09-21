import { action } from '@ember/object';
import { BaseValidationArgs, BaseValidationComponent } from './base';

interface TpkValidationRadioArgs extends BaseValidationArgs {}

export default class TpkValidationRadio extends BaseValidationComponent<TpkValidationRadioArgs> {
  @action onChange(value: string) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }
}
