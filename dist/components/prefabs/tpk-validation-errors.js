import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { t } from 'ember-intl';
import { service } from '@ember/service';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TpkValidationErrorsComponent;
let TpkValidationErrorsComponent = (_class = (_TpkValidationErrorsComponent = class TpkValidationErrorsComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "intl", _descriptor, this);
    _defineProperty(this, "htmlSafe", helper(function htmlSafe$1(params) {
      return htmlSafe(params.join());
    }));
  }
  get errorMessages() {
    return this.args.errors.map(error => {
      if (error.message) {
        const translationExists = this.intl.exists(error.message);
        return htmlSafe(translationExists ? this.intl.t(error.message) : error.message);
      }
      return error;
    });
  }
}, setComponentTemplate(precompileTemplate("\n    <div class=\"tpk-validation-errors\" data-test-tpk-validation-errors ...attributes>\n      {{#each this.errorMessages as |error|}}\n        <span>\n          {{#if error.message}}\n            {{this.htmlSafe (t error.message error.params)}}\n          {{else}}\n            {{error}}\n          {{/if}}\n        </span>\n      {{/each}}\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    t
  })
}), _TpkValidationErrorsComponent), _TpkValidationErrorsComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "intl", [service], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class);

export { TpkValidationErrorsComponent as default };
//# sourceMappingURL=tpk-validation-errors.js.map
