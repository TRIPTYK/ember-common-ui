import type { TOC } from '@ember/component/template-only';
import Component from '@glimmer/component';
export type SidebarLink = {
    type: 'link';
    label: string;
    tooltip?: string;
    icon?: TOC<{
        Element: SVGSVGElement;
    }>;
    route?: string;
    onClick?: (event: PointerEvent) => void;
};
export type SidebarGroup = {
    type: 'group';
    label: string;
    isOpen?: boolean;
    tooltip?: string;
    icon?: TOC<{
        Element: SVGSVGElement;
    }>;
    items: SidebarItem[];
};
export type SidebarItem = SidebarLink | SidebarGroup;
interface SidebarSignature {
    Element: HTMLElement;
    Args: {
        sidebarItems?: SidebarItem[];
        drawerId?: string;
        collapsed?: boolean;
        onCollapsedChange?: (collapsed: boolean) => void;
    };
    Blocks: {
        header: [];
        default: [];
        footer: [];
    };
}
declare class TpkSidebarComponent extends Component<SidebarSignature> {
    handleToggle(): void;
}
export default TpkSidebarComponent;
//# sourceMappingURL=tpk-sidebar.d.ts.map