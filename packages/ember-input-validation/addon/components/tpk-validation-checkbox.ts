import { action } from '@ember/object';
import { BaseValidationArgs, BaseValidationComponent } from './base';

interface TpkValidationCheckboxArgs extends BaseValidationArgs {}

export default class TpkValidationCheckbox extends BaseValidationComponent<TpkValidationCheckboxArgs> {
  @action onChange(checked: boolean) {
    if (this.args.onChange) {
      return this.args.onChange(checked);
    }
    return this.args.changeset.set(this.args.validationField, checked);
  }
}
