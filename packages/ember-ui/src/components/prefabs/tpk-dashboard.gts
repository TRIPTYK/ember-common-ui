import type { TOC } from '@ember/component/template-only';
import TpkNavbar, { type NavbarItem } from './tpk-navbar.gts';
import TpkSidebar, { type SidebarItem } from './tpk-sidebar.gts';

export type { NavbarItem, SidebarItem };

interface DashboardSignature {
  Element: HTMLDivElement;
  Args: {
    title?: string;
    navbarItems?: NavbarItem[];
    sidebarItems?: SidebarItem[];
    currentUser?: {
      fullName: string;
    };
  };
  Blocks: {
    default: [];
  };
}

const TpkDashboard: TOC<DashboardSignature> = <template>
  <div class='drawer lg:drawer-open'>
    <input id='my-drawer-4' type='checkbox' class='drawer-toggle' />
    <div class='drawer-content'>
      <TpkNavbar
        @title={{@title}}
        @navbarItems={{@navbarItems}}
        @drawerId='my-drawer-4'
        @currentUser={{@currentUser}}
      />
      {{yield}}
    </div>

    <TpkSidebar @sidebarItems={{@sidebarItems}} @drawerId='my-drawer-4' />
  </div>
</template>;

export default TpkDashboard;
