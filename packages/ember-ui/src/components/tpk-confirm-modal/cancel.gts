import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';

export interface TpkConfirmModalCancelComponentSignature {
  Args: {
    onClose: (...args: unknown[]) => unknown;
    icon?: string;
    cancelText?: string;
  };
  Element: HTMLButtonElement;
  Blocks: {
    default: [];
  };
}

const TpkConfirmModalCancelComponent: TOC<TpkConfirmModalCancelComponentSignature> =
  <template>
    <button
      {{on 'click' @onClose}}
      data-test-confirm-modal-cancel
      class='btn-confirm-modal-cancel'
      type='button'
      ...attributes
    >
    {{#if (has-block)}}
      {{yield}}
    {{else}}
      {{@icon}}
      {{@cancelText}}
    {{/if}}
    </button>
  </template>;

export default TpkConfirmModalCancelComponent;
