import { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';

export interface TpkConfirmModalConfirmComponentSignature {
  Args: {
    onConfirm: (...args: unknown[]) => unknown;
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
      ...attributes
    >
      {{yield}}
    </button>
  </template>;

export default TpkConfirmModalConfirmComponent;
