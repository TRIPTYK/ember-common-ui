import { TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';

export interface TpkConfirmModalCancelComponentSignature {
  Args: {
    onClose: (...args: unknown[]) => unknown;
    action: string;
    icon: string;
    label: string;
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
      type='button'
      ...attributes
    >
      {{yield}}
    </button>
  </template>;

export default TpkConfirmModalCancelComponent;
