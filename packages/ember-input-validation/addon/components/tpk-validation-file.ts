import { action } from '@ember/object';
import { BaseValidationComponent, BaseValidationArgs } from './base';

interface TpkValidationFileArgs extends BaseValidationArgs {
  multiple: boolean;
}

export default class TpkValidationFile extends BaseValidationComponent<TpkValidationFileArgs> {
  @action
  onChange(file: File[]) {
    if (this.args.onChange) {
      return this.args.onChange(file);
    }
    this.args.changeset.set(
      this.args.validationField,
      this.args.multiple === true ? file : file[0]
    );
  }
}
