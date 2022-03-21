import { action } from '@ember/object';
import { BaseValidationArgs, BaseValidationComponent } from './base';

interface TpkValidationCheckboxArgs extends BaseValidationArgs {}

export default class TpkValidationCheckbox extends BaseValidationComponent<TpkValidationCheckboxArgs> {
  @action onChange(e: Event) {
    this.args.changeset.set(
      this.args.validationField,
      (e.target as HTMLInputElement).checked
    );
  }
}
