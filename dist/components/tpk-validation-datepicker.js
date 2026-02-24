import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import { assert } from '@ember/debug';
import '@triptyk/ember-input/components/tpk-datepicker-input';
import { hash } from '@ember/helper';
import TpkDatepicker from '@triptyk/ember-input/components/tpk-datepicker';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationDatepickerComponent extends BaseValidationComponent {
  onChange(dates) {
    if (dates.length === 0) return this.args.changeset.set(this.args.validationField, this.args.mode === 'multiple' || this.args.mode === 'range' ? [] : null);
    const date = this.args.mode === 'multiple' || this.args.mode === 'range' ? dates : dates[0];
    if (this.args.onChange) {
      return this.args.onChange(dates);
    }
    return this.args.changeset.set(this.args.validationField, date);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  get value() {
    assert(`@value must be a string, Date, null or [Date, Date] for @${this.args.validationField}`, typeof super.value === 'string' || super.value instanceof Date || this.args.mode === 'range' && Array.isArray(super.value) && super.value.length === 2 && super.value.every(item => item instanceof Date) || super.value === null);
    return super.value;
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkDatepicker @value={{this.value}} @label={{@label}} @onChange={{this.onChange}} @onClose={{@onClose}} @disabled={{@disabled}} @placeholder={{@placeholder}} @mask={{@mask}} @useCurrent={{@useCurrent}} @mode={{@mode}} @multipleDatesSeparator={{@multipleDatesSeparator}} @stepping={{@stepping}} @promptTimeOnDateChange={{@promptTimeOnDateChange}} @todayButton={{@todayButton}} @clearButton={{@clearButton}} @closeButton={{@closeButton}} @enableTime={{@enableTime}} @noCalendar={{@noCalendar}} @enableSecond={{@enableSecond}} @keepOpen={{@keepOpen}} @locale={{@locale}} @dateFormat={{@dateFormat}} @minDate={{@minDate}} @maxDate={{@maxDate}} @daysOfWeekDisabled={{@daysOfWeekDisabled}} @disabledTimeIntervals={{@disabledTimeIntervals}} @disabledDates={{@disabledDates}} @enabledDates={{@enabledDates}} @disabledHours={{@disabledHours}} @enabledHours={{@enabledHours}} @viewMode={{@viewMode}} ...attributes data-has-error=\"{{this.hasError}}\" as |D|>\n  {{yield (hash Input=D.Input Label=D.Label errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n</TpkDatepicker>", {
      strictMode: true,
      scope: () => ({
        TpkDatepicker,
        hash
      })
    }), this);
  }
}

export { TpkValidationDatepickerComponent as default };
//# sourceMappingURL=tpk-validation-datepicker.js.map
