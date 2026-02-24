import { on } from '@ember/modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkConfirmModalConfirmComponent = setComponentTemplate(precompileTemplate("<button {{on \"click\" @onConfirm}} data-test-confirm-modal-confirm type=\"button\" class=\"btn-confirm-modal-confirm\" ...attributes>\n  {{#if (has-block)}}\n    {{yield}}\n  {{else}}\n    {{@confirmText}}\n  {{/if}}\n</button>", {
  strictMode: true,
  scope: () => ({
    on
  })
}), templateOnly());

export { TpkConfirmModalConfirmComponent as default };
//# sourceMappingURL=confirm.js.map
