import { action } from '@ember/object';
import { BaseValidationArgs, BaseValidationComponent } from './base';

interface TpkValidationDatepickerArgs extends BaseValidationArgs {
  mode?: string;
}

export default class TpkValidationDatepicker extends BaseValidationComponent<TpkValidationDatepickerArgs> {
  @action onChange(dates: Date[]) {
    if (this.args.onChange) {
      return this.args.onChange(dates);
    }
    return this.args.changeset.set(
      this.args.validationField,
      this.args.mode === 'multiple' || this.args.mode === 'range'
        ? dates
        : dates[0],
    );
  }
}
