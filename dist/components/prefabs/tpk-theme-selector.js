import Component from '@glimmer/component';
import { action } from '@ember/object';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import t from 'ember-intl/helpers/t';
import ThemeIcon from '../../assets/icons/theme.js';
import ChevronDownIcon from '../../assets/icons/chevron-down.js';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

const DEFAULT_THEMES = ['nord', 'dracula', 'cupcake', 'corporate', 'lemonade'];
class TpkThemeSelector extends Component {
  static {
    g(this.prototype, "themes", [tracked]);
  }
  #themes = (i(this, "themes"), void 0);
  constructor(owner, args) {
    super(owner, args);
    const localStorageKey = this.args.localStorageKey || 'tpk-theme';
    if (args.themes) {
      this.themes = args.themes;
    } else {
      this.themes = DEFAULT_THEMES;
    }
    let theme = this.themes[0];
    if (typeof localStorage !== 'undefined') {
      theme = localStorage.getItem(localStorageKey) ?? 'nord';
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
  setTheme(themeName) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    const localStorageKey = this.args.localStorageKey || 'tpk-theme';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(localStorageKey, themeName);
    }
  }
  static {
    n(this.prototype, "setTheme", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"tpk-theme-selector\">\n  {{!-- template-lint-disable no-inline-styles --}}\n  <button type=\"button\" popovertarget=\"popover-theme-selector\" style=\"anchor-name:--anchor-theme-selector\" class=\"tpk-theme-selector-toggle\">\n    <ThemeIcon />\n    {{#unless @sidebarCollapsed}}\n      <span>{{t \"global.theme\"}}</span>\n      <ChevronDownIcon class=\"size-4\" />\n    {{/unless}}\n  </button>\n  <ul class=\"tpk-theme-selector-menu\" popover id=\"popover-theme-selector\" style=\"position-anchor:--anchor-theme-selector\">\n    <li class=\"tpk-theme-selector-menu-item\">{{t \"global.theme\"}}</li>\n    {{#each this.themes as |themeName|}}\n      <li class=\"tpk-theme-selector-menu-item\">\n        <button type=\"button\" {{on \"click\" (fn this.setTheme themeName)}} class=\"flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5\">\n          <span data-theme={{themeName}} class=\"grid grid-cols-2 gap-0.5 p-0.5 rounded-sm\">\n            <span class=\"w-2 h-2 rounded-sm bg-primary\"></span>\n            <span class=\"w-2 h-2 rounded-sm bg-secondary\"></span>\n            <span class=\"w-2 h-2 rounded-sm bg-accent\"></span>\n            <span class=\"w-2 h-2 rounded-sm bg-neutral\"></span>\n          </span>\n          <span>{{themeName}}</span>\n        </button>\n      </li>\n    {{/each}}\n  </ul>\n</div>", {
      strictMode: true,
      scope: () => ({
        ThemeIcon,
        t,
        ChevronDownIcon,
        on,
        fn
      })
    }), this);
  }
}

export { TpkThemeSelector as default };
//# sourceMappingURL=tpk-theme-selector.js.map
