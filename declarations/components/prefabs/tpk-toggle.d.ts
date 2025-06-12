import type { MergeDeep } from 'type-fest';
import type { BaseUIComponentArgs } from '../base';
import type { TOC } from '@ember/component/template-only';
export type TpkTogglePrefabSignature = {
    Args: MergeDeep<BaseUIComponentArgs['Args'], {
        checked?: boolean;
        disabled?: boolean;
        onChange?: (isChecked: boolean, value: string, e: Event) => unknown;
    }>;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
};
declare const TpkTogglePrefabComponent: TOC<TpkTogglePrefabSignature>;
export default TpkTogglePrefabComponent;
//# sourceMappingURL=tpk-toggle.d.ts.map