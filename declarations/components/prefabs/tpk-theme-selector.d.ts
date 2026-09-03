import Component from '@glimmer/component';
import type Owner from '@ember/owner';
interface ThemeSelectorSignature {
    Args: {
        sidebarCollapsed?: boolean;
        localStorageKey?: string;
        themes?: string[];
    };
}
export default class TpkThemeSelector extends Component<ThemeSelectorSignature> {
    themes: string[];
    constructor(owner: Owner, args: ThemeSelectorSignature['Args']);
    setTheme(themeName: string): void;
}
export {};
//# sourceMappingURL=tpk-theme-selector.d.ts.map