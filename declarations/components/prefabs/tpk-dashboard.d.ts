import type { TOC } from '@ember/component/template-only';
import { type NavbarItem, type Language } from './tpk-navbar';
import { type SidebarItem } from './tpk-sidebar';
export type { NavbarItem, SidebarItem, Language };
interface DashboardSignature {
    Element: HTMLDivElement;
    Args: {
        title?: string;
        navbarItems?: NavbarItem[];
        sidebarItems?: SidebarItem[];
        currentUser?: {
            fullName: string;
        };
        onLogout?: () => void;
        logoutLabel?: string;
        profileRoute?: string;
        profileLabel?: string;
        drawerId?: string;
        collapsed?: boolean;
        onCollapsedChange?: (collapsed: boolean) => void;
        onSidebarToggle?: () => void;
        languages?: Language[];
        onLocaleChange?: (locale: string) => void;
    };
    Blocks: {
        header: [];
        footer: [];
        menu: [];
        content: [];
    };
}
declare const TpkDashboard: TOC<DashboardSignature>;
export default TpkDashboard;
//# sourceMappingURL=tpk-dashboard.d.ts.map