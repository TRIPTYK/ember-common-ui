import TpkNavbar from './tpk-navbar.js';
import TpkSidebarComponent from './tpk-sidebar.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkDashboard = setComponentTemplate(precompileTemplate("<div class=\"tpk-dashboard drawer lg:drawer-open\">\n  <input id={{if @drawerId @drawerId \"tpk-dashboard-drawer\"}} type=\"checkbox\" class=\"tpk-dashboard-drawer drawer-toggle\" />\n  <div class=\"tpk-dashboard-content drawer-content\">\n    <TpkNavbar @title={{@title}} @navbarItems={{@navbarItems}} @drawerId={{if @drawerId @drawerId \"tpk-dashboard-drawer\"}} @onSidebarToggle={{@onSidebarToggle}} @languages={{@languages}} @onLocaleChange={{@onLocaleChange}} @currentUser={{@currentUser}} @onLogout={{@onLogout}} @logoutLabel={{@logoutLabel}} @profileRoute={{@profileRoute}} @profileLabel={{@profileLabel}}>\n      <:menu>\n        {{#if (has-block \"menu\")}}\n          {{yield to=\"menu\"}}\n        {{/if}}\n      </:menu>\n    </TpkNavbar>\n    {{#if (has-block \"content\")}}\n      {{yield to=\"content\"}}\n    {{/if}}\n  </div>\n  <TpkSidebar @sidebarItems={{@sidebarItems}} @drawerId={{if @drawerId @drawerId \"tpk-dashboard-drawer\"}} @collapsed={{@collapsed}} @onCollapsedChange={{@onCollapsedChange}}>\n    <:header>\n      {{#if (has-block \"header\")}}\n        {{yield to=\"header\"}}\n      {{/if}}\n    </:header>\n    <:footer>\n      {{#if (has-block \"footer\")}}\n        {{yield to=\"footer\"}}\n      {{/if}}\n    </:footer>\n  </TpkSidebar>\n</div>", {
  strictMode: true,
  scope: () => ({
    TpkNavbar,
    TpkSidebar: TpkSidebarComponent
  })
}), templateOnly());

export { TpkDashboard as default };
//# sourceMappingURL=tpk-dashboard.js.map
