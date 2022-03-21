import { action } from '@ember/object';
import { BaseValidationComponent, BaseValidationArgs } from './base';

interface TpkValidationTextareaArgs extends BaseValidationArgs {}

export default class TpkValidationTextarea extends BaseValidationComponent<TpkValidationTextareaArgs> {
  @action onChange(e: Event) {
    this.args.changeset.set(
      this.args.validationField,
      (e.target as HTMLInputElement).value
    );
  }
}
