import type { MergeDeep } from 'type-fest';
import type { BaseUIArgs } from '../base';
import type { TOC } from '@ember/component/template-only';
export type TpkTogglePrefabSignature = {
    Args: MergeDeep<BaseUIArgs['Args'], {
        checked?: boolean;
        disabled?: boolean;
        onChange?: (isChecked: boolean, value: string, e: Event) => unknown;
    }>;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
};
declare const TpkTogglePrefab: TOC<TpkTogglePrefabSignature>;
export default TpkTogglePrefab;
//# sourceMappingURL=tpk-toggle.d.ts.map