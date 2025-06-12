import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import TpkValidationInputComponent from '../tpk-validation-input.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import { maskSpecialCharDefinition } from '../../utils/mask-utils.js';
import MandatoryLabelComponent from './mandatory-label.js';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationBicPrefabComponent;
let TpkValidationBicPrefabComponent = (_class = (_TpkValidationBicPrefabComponent = class TpkValidationBicPrefabComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "mask", '########[$$$]');
    _defineProperty(this, "maskOptions", {
      definitions: maskSpecialCharDefinition
    });
  }
  onChange(value, e) {
    const valueAsString = value.toUpperCase();
    if (this.args.onChange) {
      return this.args.onChange(valueAsString, e);
    }
    return this.args.changeset.set(this.args.validationField, valueAsString);
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkValidationInputComponent @label={{@label}} @disabled={{@disabled}} @type=\"text\" @onChange={{this.onChange}} @mandatory={{@mandatory}} @placeholder={{@placeholder}} @validationField={{@validationField}} @changeEvent={{@changeEvent}} @changeset={{@changeset}} @mask={{this.mask}} @maskOptions={{this.maskOptions}} @requiredFields={{@requiredFields}} as |V|>\n        <V.Label class=\"tpk-bic-container\" data-test-tpk-prefab-bic-container data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} ...attributes>\n          <MandatoryLabelComponent class=\"tpk-label\" @label={{@label}} @mandatory={{V.mandatory}} />\n          <V.Input class=\"tpk-bic-input uppercase\" data-test-tpk-bic-input />\n          <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n        </V.Label>\n    </TpkValidationInputComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationInputComponent,
    MandatoryLabelComponent,
    TpkValidationErrorsComponent
  })
}), _TpkValidationBicPrefabComponent), _TpkValidationBicPrefabComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationBicPrefabComponent as default };
//# sourceMappingURL=tpk-validation-bic.js.map
