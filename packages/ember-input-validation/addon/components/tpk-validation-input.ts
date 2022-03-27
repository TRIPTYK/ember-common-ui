import { action } from '@ember/object';
import { BaseValidationArgs, BaseValidationComponent } from './base';

interface TpkValidationInputArgs extends BaseValidationArgs {}

export default class TpkValidationInput extends BaseValidationComponent<TpkValidationInputArgs> {
  @action onChange(e: Event) {
    this.args.changeset.set(
      this.args.validationField,
      (e.target as HTMLInputElement).value
    );
  }
}
