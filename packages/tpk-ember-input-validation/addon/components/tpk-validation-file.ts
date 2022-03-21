import { action } from '@ember/object';
import { BaseValidationComponent, BaseValidationArgs } from './base';

interface TpkValidationFileArgs extends BaseValidationArgs {}

export default class TpkValidationFile extends BaseValidationComponent<TpkValidationFileArgs> {
  @action
  onChange(file: File[]) {
    this.args.changeset.set(this.args.validationField, file);
  }
}
