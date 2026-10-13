import type { TOC } from '@ember/component/template-only';
export interface NavbarItem {
    label: string;
    onClick?: (event: PointerEvent) => void;
    href?: string;
}
export interface Language {
    code: string;
    label: string;
}
interface NavbarSignature {
    Element: HTMLElement;
    Args: {
        title?: string;
        navbarItems?: NavbarItem[];
        drawerId?: string;
        onSidebarToggle?: () => void;
        languages?: Language[];
        onLocaleChange?: (locale: string) => void;
        currentUser?: {
            fullName: string;
        };
        onLogout?: () => void;
        logoutLabel?: string;
        profileRoute?: string;
        profileLabel?: string;
    };
    Blocks: {
        menu: [];
        default: [];
    };
}
declare const TpkNavbar: TOC<NavbarSignature>;
export default TpkNavbar;
//# sourceMappingURL=tpk-navbar.d.ts.map