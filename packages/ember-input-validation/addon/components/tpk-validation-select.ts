import { action } from '@ember/object';
import { BaseValidationArgs, BaseValidationComponent } from './base';

interface TpkValidationSelectArgs extends BaseValidationArgs {}

export default class TpkValidationSelect extends BaseValidationComponent<TpkValidationSelectArgs> {
  @action onChange(value: string) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }
}
