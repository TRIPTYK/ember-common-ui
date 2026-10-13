import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import EarthIcon from '../../assets/icons/earth.js';
import BurgerIcon from '../../assets/icons/burger.js';
import SidepageIcon from '../../assets/icons/sidepage.js';
import ChevronDownIcon from '../../assets/icons/chevron-down.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkNavbar = setComponentTemplate(precompileTemplate("<nav class=\"tpk-navbar\">\n  <div class=\"navbar-start\">\n    {{#if @drawerId}}\n      <label for={{@drawerId}} aria-label=\"sidebar\" class=\"tpk-navbar-toggle-drawer\">\n        <BurgerIcon class=\"size-5\" />\n      </label>\n    {{/if}}\n    {{#if @onSidebarToggle}}\n      <button type=\"button\" aria-label=\"toggle sidebar\" class=\"tpk-navbar-toggle\" {{on \"click\" @onSidebarToggle}}>\n        <SidepageIcon class=\"size-5\" />\n      </button>\n    {{/if}}\n    <span class=\"tpk-navbar-title\">{{@title}}</span>\n  </div>\n  <div class=\"navbar-center\">\n    <ul class=\"tpk-navbar-menu-horizontal\">\n      {{#each @navbarItems as |item|}}\n        <li>\n          {{#if item.href}}\n            <a href={{item.href}}>{{item.label}}</a>\n          {{else if item.onClick}}\n            <button type=\"button\" {{on \"click\" item.onClick}}>{{item.label}}</button>\n          {{/if}}\n        </li>\n      {{/each}}\n    </ul>\n  </div>\n  <div class=\"navbar-end\">\n    {{#if @currentUser}}\n      <div class=\"tpk-navbar-user-menu-dropdown dropdown dropdown-end\">\n        {{!-- template-lint-disable no-inline-styles --}}\n        <button type=\"button\" class=\"tpk-navbar-user-menu-toggle\" popovertarget=\"popover-user\" style=\"anchor-name:--anchor-user\">\n          <span class=\"tpk-navbar-user-name\">{{@currentUser.fullName}}</span>\n          <ChevronDownIcon class=\"size-4\" />\n        </button>\n        <ul popover id=\"popover-user\" style=\"position-anchor:--anchor-user\" class=\"tpk-navbar-user-menu-content\">\n          {{#if @profileRoute}}\n            <li><LinkTo @route={{@profileRoute}}>{{if @profileLabel @profileLabel \"My Profile\"}}</LinkTo></li>\n          {{/if}}\n          {{#if (has-block \"menu\")}}\n            {{yield to=\"menu\"}}\n          {{/if}}\n          {{#if @onLogout}}\n            <li><button type=\"button\" {{on \"click\" @onLogout}}>{{if @logoutLabel @logoutLabel \"Logout\"}}</button></li>\n          {{/if}}\n        </ul>\n      </div>\n    {{/if}}\n    {{#if @onLocaleChange}}\n      {{#if @languages}}\n        <div class=\"tpk-navbar-locale-selector\">\n          {{!-- template-lint-disable no-inline-styles --}}\n          <button type=\"button\" class=\"tpk-navbar-locale-toggle\" popovertarget=\"popover-language\" style=\"anchor-name:--anchor-language\" aria-label=\"Language selector\">\n            <EarthIcon class=\"size-4\" />\n          </button>\n          <ul class=\"tpk-navbar-locale-menu\" popover id=\"popover-language\" style=\"position-anchor:--anchor-language\">\n            {{#each @languages as |language|}}\n              <li>\n                <button type=\"button\" {{on \"click\" (fn @onLocaleChange language.code)}}>\n                  {{language.label}}\n                </button>\n              </li>\n            {{/each}}\n          </ul>\n        </div>\n      {{/if}}\n    {{/if}}\n  </div>\n  {{yield}}\n</nav>", {
  strictMode: true,
  scope: () => ({
    BurgerIcon,
    on,
    SidepageIcon,
    ChevronDownIcon,
    LinkTo,
    EarthIcon,
    fn
  })
}), templateOnly());

export { TpkNavbar as default };
//# sourceMappingURL=tpk-navbar.js.map
