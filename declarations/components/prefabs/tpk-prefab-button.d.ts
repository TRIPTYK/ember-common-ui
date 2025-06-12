import type { MergeDeep } from "type-fest";
import type { BaseUIComponentArgs } from "../base";
import type { TOC } from "@ember/component/template-only";
export type TpkButtonPrefabSignature = {
    Args: MergeDeep<BaseUIComponentArgs['Args'], {
        disabled?: boolean;
        label: string;
        onClick: (e: Event) => void | Promise<void>;
    }>;
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
};
declare const TpkButtonPrefabComponent: TOC<TpkButtonPrefabSignature>;
export default TpkButtonPrefabComponent;
//# sourceMappingURL=tpk-prefab-button.d.ts.map