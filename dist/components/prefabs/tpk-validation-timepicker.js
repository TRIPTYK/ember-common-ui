import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import TpkValidationDatepickerComponent from '../tpk-validation-datepicker.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class TpkValidationTimepickerPrefabComponent extends Component {
  static {
    g(this.prototype, "mask", [tracked], function () {
      return 'H:M';
    });
  }
  #mask = (i(this, "mask"), void 0);
  static {
    g(this.prototype, "dateFormat", [tracked], function () {
      return 'HH:mm';
    });
  }
  #dateFormat = (i(this, "dateFormat"), void 0);
  constructor(owner, args) {
    super(owner, args);
    if (args.enableSecond) {
      this.mask = 'H:M:S';
      this.dateFormat = 'HH:mm:ss';
    }
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkValidationDatepickerComponent @label={{@label}} @onChange={{@onChange}} @onClose={{@onClose}} @disabled={{@disabled}} @validationField={{@validationField}} @changeset={{@changeset}} @enableSecond={{@enableSecond}} @mandatory={{@mandatory}} @stepping={{@stepping}} @placeholder={{@placeholder}} @clearButton={{@clearButton}} @locale={{@locale}} @enableTime={{true}} @noCalendar={{true}} @mask={{this.mask}} @dateFormat={{this.dateFormat}} @requiredFields={{@requiredFields}} as |V|>\n  <div class=\"tpk-timepicker-container\" data-test-tpk-prefab-timepicker-container={{@validationField}} data-has-error=\"{{V.hasError}}\" {{!-- @glint-ignore --}} anchorScrollUp={{@validationField}} ...attributes>\n    <V.Label class=\"tpk-timepicker-label-container\">\n      <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n    </V.Label>\n    <V.Input class=\"tpk-timepicker-input\" data-test-tpk-timepicker-input />\n    <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n  </div>\n</TpkValidationDatepickerComponent>", {
      strictMode: true,
      scope: () => ({
        TpkValidationDatepickerComponent,
        MandatoryLabelComponent,
        TpkValidationErrorsComponent
      })
    }), this);
  }
}

export { TpkValidationTimepickerPrefabComponent as default };
//# sourceMappingURL=tpk-validation-timepicker.js.map
