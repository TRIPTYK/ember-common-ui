import type { TOC } from '@ember/component/template-only';
export type TpkButtonPrefabSignature = {
    Args: {
        disabled?: boolean;
        label: string;
        onClick: (e: Event) => void | Promise<void>;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
};
declare const TpkButtonPrefab: TOC<TpkButtonPrefabSignature>;
export default TpkButtonPrefab;
//# sourceMappingURL=tpk-prefab-button.d.ts.map