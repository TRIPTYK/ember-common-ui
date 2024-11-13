import Component from '@glimmer/component';
export interface ModalConfirmArgs {
    onClose: (e: Event) => unknown;
    onConfirm: (e: Event) => unknown;
    confirmQuestion: string;
    isOpen?: boolean;

}
export default class ModalConfirm extends Component<ModalConfirmArgs> {
}
//# sourceMappingURL=tpk-confirm-modal.d.ts.map
