import { on } from '@ember/modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkConfirmModalCancelComponent = setComponentTemplate(precompileTemplate("\n    <button {{on \"click\" @onClose}} data-test-confirm-modal-cancel class=\"btn-confirm-modal-cancel\" type=\"button\" ...attributes>\n    {{#if (has-block)}}\n      {{yield}}\n    {{else}}\n      {{@icon}}\n      {{@cancelText}}\n    {{/if}}\n    </button>\n  ", {
  strictMode: true,
  scope: () => ({
    on
  })
}), templateOnly());

export { TpkConfirmModalCancelComponent as default };
//# sourceMappingURL=cancel.js.map
