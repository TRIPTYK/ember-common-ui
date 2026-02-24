import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import TpkValidationDatepickerComponent from '../tpk-validation-datepicker.js';
import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class TpkValidationDatepickerPrefabComponent extends Component {
  static {
    g(this.prototype, "multipleDatesSeparator", [tracked], function () {
      return ' - ';
    });
  }
  #multipleDatesSeparator = (i(this, "multipleDatesSeparator"), void 0);
  constructor(owner, args) {
    super(owner, args);
    assert('If you want use range datepicker, please use TpkValidationDatepickerRangePrefab', args.mode !== 'range');
    assert('If you want use timepicker, please use TpkValidationTimepickerPrefab', args.noCalendar !== true);
    if (args.multipleDatesSeparator) {
      this.multipleDatesSeparator = args.multipleDatesSeparator;
    }
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkValidationDatepickerComponent @label={{@label}} @onChange={{@onChange}} @onClose={{@onClose}} @disabled={{@disabled}} @mandatory={{@mandatory}} @validationField={{@validationField}} @changeset={{@changeset}} @promptTimeOnDateChange={{@promptTimeOnDateChange}} @enableTime={{@enableTime}} @stepping={{@stepping}} @enableSecond={{@enableSecond}} @disabledTimeIntervals={{@disabledTimeIntervals}} @disabledHours={{@disabledHours}} @enabledHours={{@enabledHours}} @placeholder={{@placeholder}} @clearButton={{@clearButton}} @todayButton={{@todayButton}} @closeButton={{@closeButton}} @minDate={{@minDate}} @maxDate={{@maxDate}} @keepOpen={{@keepOpen}} @daysOfWeekDisabled={{@daysOfWeekDisabled}} @disabledDates={{@disabledDates}} @viewMode={{@viewMode}} @locale={{@locale}} @dateFormat={{@dateFormat}} @multipleDatesSeparator={{this.multipleDatesSeparator}} @requiredFields={{@requiredFields}} @mode={{@mode}} as |V|>\n  <div class=\"tpk-datepicker-container\" data-test-tpk-prefab-datepicker-container={{@validationField}} {{!-- @glint-expect-error --}} anchorScrollUp={{@validationField}} data-has-error=\"{{V.hasError}}\" ...attributes>\n    <V.Label class=\"tpk-datepicker-label-container\">\n      <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n    </V.Label>\n    <V.Input class=\"tpk-datepicker-input\" data-test-tpk-datepicker-input />\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </div>\n</TpkValidationDatepickerComponent>", {
      strictMode: true,
      scope: () => ({
        TpkValidationDatepickerComponent,
        MandatoryLabelComponent,
        TpkValidationErrorsComponent
      })
    }), this);
  }
}

export { TpkValidationDatepickerPrefabComponent as default };
//# sourceMappingURL=tpk-validation-datepicker.js.map
