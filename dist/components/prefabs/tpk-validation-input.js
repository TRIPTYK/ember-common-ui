import TpkValidationInputComponent from '../tpk-validation-input.js';
import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkValidationInputPrefabComponent;
class TpkValidationInputPrefabComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    assert('If you want use integer args, use TpkValidationInputIntegerPrefab', typeof args.min === 'undefined' || typeof args.max === 'undefined' || typeof args.step === 'undefined');
  }
}
_TpkValidationInputPrefabComponent = TpkValidationInputPrefabComponent;
setComponentTemplate(precompileTemplate("\n    <TpkValidationInputComponent @type={{@type}} @label={{@label}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @onChange={{@onChange}} @placeholder={{@placeholder}} @validationField={{@validationField}} @mask={{@mask}} @mandatory={{@mandatory}} @maskOptions={{@maskOptions}} @unmaskValue={{@unmaskValue}} @changeset={{@changeset}} @requiredFields={{@requiredFields}} as |V|>\n      <V.Label class=\"tpk-input-container\" data-test-tpk-prefab-input-container data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} ...attributes>\n        <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n        <V.Input class=\"tpk-input-input\" data-test-tpk-input-input />\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n      </V.Label>\n    </TpkValidationInputComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationInputComponent,
    MandatoryLabelComponent,
    TpkValidationErrorsComponent
  })
}), _TpkValidationInputPrefabComponent);

export { TpkValidationInputPrefabComponent as default };
//# sourceMappingURL=tpk-validation-input.js.map
