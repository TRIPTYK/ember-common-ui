import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import TpkValidationDatepickerComponent from '../tpk-validation-datepicker.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _descriptor2, _TpkValidationTimepickerPrefabComponent;
let TpkValidationTimepickerPrefabComponent = (_class = (_TpkValidationTimepickerPrefabComponent = class TpkValidationTimepickerPrefabComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "mask", _descriptor, this);
    _initializerDefineProperty(this, "dateFormat", _descriptor2, this);
    if (args.enableSecond) {
      this.mask = 'H:M:S';
      this.dateFormat = 'HH:mm:ss';
    }
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkValidationDatepickerComponent @label={{@label}} @onChange={{@onChange}} @onClose={{@onClose}} @disabled={{@disabled}} @validationField={{@validationField}} @changeset={{@changeset}} @enableSecond={{@enableSecond}} @mandatory={{@mandatory}} @stepping={{@stepping}} @placeholder={{@placeholder}} @clearButton={{@clearButton}} @locale={{@locale}} @enableTime={{true}} @noCalendar={{true}} @mask={{this.mask}} @dateFormat={{this.dateFormat}} @requiredFields={{@requiredFields}} as |V|>\n      <div class=\"tpk-timepicker-container\" data-test-tpk-prefab-timepicker-container data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} ...attributes>\n        <V.Label class=\"tpk-timepicker-label-container\">\n          <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n        </V.Label>\n        <V.Input class=\"tpk-timepicker-input\" data-test-tpk-timepicker-input />\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n      </div>\n    </TpkValidationDatepickerComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationDatepickerComponent,
    MandatoryLabelComponent,
    TpkValidationErrorsComponent
  })
}), _TpkValidationTimepickerPrefabComponent), _TpkValidationTimepickerPrefabComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "mask", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 'H:M';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "dateFormat", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 'HH:mm';
  }
}), _class);

export { TpkValidationTimepickerPrefabComponent as default };
//# sourceMappingURL=tpk-validation-timepicker.js.map
