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
    onLogout?: () => void;
    logoutLabel?: string;
    profileRoute?: string;
    profileLabel?: string;
    drawerId?: string;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    onSidebarToggle?: () => void;
  };
  Blocks: {
    header: [];
    footer: [];
    menu: [];
    content: [];
  };
}

const TpkDashboard: TOC<DashboardSignature> = <template>
  <div class='tpk-dashboard drawer lg:drawer-open'>
    <input
      id={{if @drawerId @drawerId 'tpk-dashboard-drawer'}}
      type='checkbox'
      class='tpk-dashboard-drawer drawer-toggle'
    />
    <div class='tpk-dashboard-content drawer-content'>
      <TpkNavbar
        @title={{@title}}
        @navbarItems={{@navbarItems}}
        @drawerId={{if @drawerId @drawerId 'tpk-dashboard-drawer'}}
        @onSidebarToggle={{@onSidebarToggle}}
        @currentUser={{@currentUser}}
        @onLogout={{@onLogout}}
        @logoutLabel={{@logoutLabel}}
        @profileRoute={{@profileRoute}}
        @profileLabel={{@profileLabel}}
      >
        <:menu>
          {{#if (has-block 'menu')}}
            {{yield to='menu'}}
          {{/if}}
        </:menu>
      </TpkNavbar>
      {{#if (has-block 'content')}}
        {{yield to='content'}}
      {{/if}}
    </div>
    <TpkSidebar
      @sidebarItems={{@sidebarItems}}
      @drawerId={{if @drawerId @drawerId 'tpk-dashboard-drawer'}}
      @collapsed={{@collapsed}}
      @onCollapsedChange={{@onCollapsedChange}}
    >
      <:header>
        {{#if (has-block 'header')}}
          {{yield to='header'}}
        {{/if}}
      </:header>
      <:footer>
        {{#if (has-block 'footer')}}
          {{yield to='footer'}}
        {{/if}}
      </:footer>
    </TpkSidebar>
  </div>
</template>;

export default TpkDashboard;
