import type { WithBoundArgs } from '@glint/template';
import TpkConfirmModalConfirmComponent from './tpk-confirm-modal/confirm.gts';
import TpkConfirmModalCancelComponent from './tpk-confirm-modal/cancel.gts';
import type { TOC } from '@ember/component/template-only';
export interface TpkConfirmModalSignature {
    Args: {
        onClose: () => unknown;
        onConfirm: (...args: unknown[]) => unknown;
        confirmQuestion: string;
        cancelText?: string;
        confirmText?: string;
        isOpen: boolean;
        outsideClickHandler?: ((e: MouseEvent | TouchEvent) => unknown) | undefined;
    };
    Element: HTMLDivElement;
    Blocks: {
        default: [
            {
                Confirm: WithBoundArgs<typeof TpkConfirmModalConfirmComponent, 'onConfirm'>;
                Cancel: WithBoundArgs<typeof TpkConfirmModalCancelComponent, 'onClose'>;
            }
        ];
    };
}
declare const TpkConfirmModalComponent: TOC<TpkConfirmModalSignature>;
export default TpkConfirmModalComponent;
//# sourceMappingURL=tpk-confirm-modal.d.ts.map