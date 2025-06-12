import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import TpkValidationDatepickerComponent from '../tpk-validation-datepicker.js';
import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TpkValidationDatepickerPrefabComponent;
let TpkValidationDatepickerPrefabComponent = (_class = (_TpkValidationDatepickerPrefabComponent = class TpkValidationDatepickerPrefabComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "multipleDatesSeparator", _descriptor, this);
    assert('If you want use range datepicker, please use TpkValidationDatepickerRangePrefab', args.mode !== 'range');
    assert('If you want use timepicker, please use TpkValidationTimepickerPrefab', args.noCalendar !== true);
    if (args.multipleDatesSeparator) {
      this.multipleDatesSeparator = args.multipleDatesSeparator;
    }
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkValidationDatepickerComponent @label={{@label}} @onChange={{@onChange}} @onClose={{@onClose}} @disabled={{@disabled}} @mandatory={{@mandatory}} @validationField={{@validationField}} @changeset={{@changeset}} @promptTimeOnDateChange={{@promptTimeOnDateChange}} @enableTime={{@enableTime}} @stepping={{@stepping}} @enableSecond={{@enableSecond}} @disabledTimeIntervals={{@disabledTimeIntervals}} @disabledHours={{@disabledHours}} @enabledHours={{@enabledHours}} @placeholder={{@placeholder}} @clearButton={{@clearButton}} @todayButton={{@todayButton}} @closeButton={{@closeButton}} @minDate={{@minDate}} @maxDate={{@maxDate}} @keepOpen={{@keepOpen}} @daysOfWeekDisabled={{@daysOfWeekDisabled}} @disabledDates={{@disabledDates}} @viewMode={{@viewMode}} @locale={{@locale}} @dateFormat={{@dateFormat}} @multipleDatesSeparator={{this.multipleDatesSeparator}} @requiredFields={{@requiredFields}} @mode={{@mode}} as |V|>\n      <div class=\"tpk-datepicker-container\" data-test-tpk-prefab-datepicker-container anchorScrollUp={{@validationField}} data-has-error=\"{{V.hasError}}\" ...attributes>\n        <V.Label class=\"tpk-datepicker-label-container\">\n          <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n        </V.Label>\n        <V.Input class=\"tpk-datepicker-input\" data-test-tpk-datepicker-input />\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n      </div>\n    </TpkValidationDatepickerComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationDatepickerComponent,
    MandatoryLabelComponent,
    TpkValidationErrorsComponent
  })
}), _TpkValidationDatepickerPrefabComponent), _TpkValidationDatepickerPrefabComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "multipleDatesSeparator", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return ' - ';
  }
}), _class);

export { TpkValidationDatepickerPrefabComponent as default };
//# sourceMappingURL=tpk-validation-datepicker.js.map
