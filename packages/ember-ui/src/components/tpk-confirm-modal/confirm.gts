import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';

export interface TpkConfirmModalConfirmSignature {
  Args: {
    onConfirm: (...args: unknown[]) => unknown;
    confirmText?: string;
    icon?: string;
  };
  Element: HTMLButtonElement;
  Blocks: {
    default: [];
  };
}

const TpkConfirmModalConfirm: TOC<TpkConfirmModalConfirmSignature> = <template>
  <button
    {{on 'click' @onConfirm}}
    data-test-confirm-modal-confirm
    type='button'
    class='btn-confirm-modal-confirm'
    ...attributes
  >
    {{#if (has-block)}}
      {{yield}}
    {{else}}
      {{@confirmText}}
    {{/if}}
  </button>
</template>;

export default TpkConfirmModalConfirm;
