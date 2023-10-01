import { action } from '@ember/object';
import { BaseValidationArgs, BaseValidationComponent } from './base';

interface TpkValidationDatepickerArgs extends BaseValidationArgs {
  mode?: string;
}

export default class TpkValidationDatepicker extends BaseValidationComponent<TpkValidationDatepickerArgs> {
  @action onChange(dates: Date[]) {
    const date =
      this.args.mode === 'multiple' || this.args.mode === 'range'
        ? dates
        : dates[0];
    if (this.args.onChange) {
      return this.args.onChange(date);
    }
    return this.args.changeset.set(this.args.validationField, date);
  }
}
