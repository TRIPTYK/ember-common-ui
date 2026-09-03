import type { TOC } from '@ember/component/template-only';
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
declare const TpkConfirmModalConfirm: TOC<TpkConfirmModalConfirmSignature>;
export default TpkConfirmModalConfirm;
//# sourceMappingURL=confirm.d.ts.map