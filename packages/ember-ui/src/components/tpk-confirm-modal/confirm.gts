import type { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';

export interface TpkConfirmModalConfirmComponentSignature {
  Args: {
    onConfirm: (...args: unknown[]) => unknown;
    confirmLabel?: string;
    icon?: string;
  };
  Element: HTMLButtonElement;
  Blocks: {
    default: [];
  };
}

const TpkConfirmModalConfirmComponent: TOC<TpkConfirmModalConfirmComponentSignature> =
  <template>
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
      {{@confirmLabel}}
    {{/if}}
    </button>
  </template>;

export default TpkConfirmModalConfirmComponent;
