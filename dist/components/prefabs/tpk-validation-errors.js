import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { t } from 'ember-intl';
import { service } from '@ember/service';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class TpkValidationErrorsComponent extends Component {
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
  htmlSafe = helper(function htmlSafe$1(params) {
    return htmlSafe(params.join());
  });
  get errorMessages() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.args.errors.map(error => {
      if (error.message) {
        const translationExists = this.intl.exists(error.message);
        return htmlSafe(translationExists ? this.intl.t(error.message) : error.message);
      }
      return error;
    });
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"tpk-validation-errors\" data-test-tpk-validation-errors ...attributes>\n  {{#each this.errorMessages as |error|}}\n    <span>\n      {{#if error.message}}\n        {{this.htmlSafe (t error.message error.params)}}\n      {{else}}\n        {{error}}\n      {{/if}}\n    </span>\n  {{/each}}\n</div>", {
      strictMode: true,
      scope: () => ({
        t
      })
    }), this);
  }
}

export { TpkValidationErrorsComponent as default };
//# sourceMappingURL=tpk-validation-errors.js.map
