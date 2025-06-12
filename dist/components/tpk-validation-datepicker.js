import { _ as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import { assert } from '@ember/debug';
import '@triptyk/ember-input/components/tpk-datepicker-input';
import { hash } from '@ember/helper';
import TpkDatepicker from '@triptyk/ember-input/components/tpk-datepicker';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationDatepickerComponent;
let TpkValidationDatepickerComponent = (_class = (_TpkValidationDatepickerComponent = class TpkValidationDatepickerComponent extends BaseValidationComponent {
  onChange(dates) {
    if (dates.length === 0) return this.args.changeset.set(this.args.validationField, this.args.mode === 'multiple' || this.args.mode === 'range' ? [] : null);
    const date = this.args.mode === 'multiple' || this.args.mode === 'range' ? dates : dates[0];
    if (this.args.onChange) {
      return this.args.onChange(dates);
    }
    return this.args.changeset.set(this.args.validationField, date);
  }
  get value() {
    assert(`@value must be a string, date or null for @${this.args.validationField}`, typeof super.value === 'string' || super.value instanceof Date || super.value === null);
    return super.value;
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkDatepicker @value={{this.value}} @label={{@label}} @onChange={{this.onChange}} @onClose={{@onClose}} @disabled={{@disabled}} @placeholder={{@placeholder}} @mask={{@mask}} @useCurrent={{@useCurrent}} @mode={{@mode}} @multipleDatesSeparator={{@multipleDatesSeparator}} @stepping={{@stepping}} @promptTimeOnDateChange={{@promptTimeOnDateChange}} @todayButton={{@todayButton}} @clearButton={{@clearButton}} @closeButton={{@closeButton}} @enableTime={{@enableTime}} @noCalendar={{@noCalendar}} @enableSecond={{@enableSecond}} @keepOpen={{@keepOpen}} @locale={{@locale}} @dateFormat={{@dateFormat}} @minDate={{@minDate}} @maxDate={{@maxDate}} @daysOfWeekDisabled={{@daysOfWeekDisabled}} @disabledTimeIntervals={{@disabledTimeIntervals}} @disabledDates={{@disabledDates}} @enabledDates={{@enabledDates}} @disabledHours={{@disabledHours}} @enabledHours={{@enabledHours}} @viewMode={{@viewMode}} ...attributes data-has-error=\"{{this.hasError}}\" as |D|>\n      {{yield (hash Input=D.Input Label=D.Label errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n    </TpkDatepicker>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkDatepicker,
    hash
  })
}), _TpkValidationDatepickerComponent), _TpkValidationDatepickerComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationDatepickerComponent as default };
//# sourceMappingURL=tpk-validation-datepicker.js.map
