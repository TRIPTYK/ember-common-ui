import type { WithBoundArgs } from "@glint/template";
import type { TpkConfirmModalSignature } from "../tpk-confirm-modal.gts";
import TpkConfirmModalComponent from "../tpk-confirm-modal.gts";
import type { TOC } from "@ember/component/template-only";
export interface TpkConfirmModalPrefabSignature {
    Args: TpkConfirmModalSignature["Args"] & {
        onClose: () => void;
        cancelText: string;
        confirmText: string;
        icon: string;
        isOpen: boolean;
    };
    Blocks: {
        default: [
            WithBoundArgs<typeof TpkConfirmModalComponent, 'onClose' | 'onConfirm' | 'confirmQuestion' | 'isOpen' | 'outsideClickHandler'>
        ];
    };
    Element: HTMLDivElement;
}
declare const TpkConfirmModalPrefabComponent: TOC<TpkConfirmModalPrefabSignature>;
export default TpkConfirmModalPrefabComponent;
//# sourceMappingURL=tpk-confirm-modal-prefab.d.ts.map