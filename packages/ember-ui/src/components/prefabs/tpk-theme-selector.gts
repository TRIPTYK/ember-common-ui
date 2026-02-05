import Component from '@glimmer/component';
import { action } from '@ember/object';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import type Owner from '@ember/owner';
import t from 'ember-intl/helpers/t';
import ThemeIcon from '../../assets/icons/theme.gts';
import ChevronDownIcon from '../../assets/icons/chevron-down.gts';

const THEMES = ['nord', 'dracula', 'cupcake', 'corporate', 'lemonade'] as const;

interface ThemeSelectorSignature {
  Args: {
    sidebarCollapsed?: boolean;
    localStorageKey?: string;
  };
}

export default class TpkThemeSelector extends Component<ThemeSelectorSignature> {
  constructor(owner: Owner, args: ThemeSelectorSignature['Args']) {
    super(owner, args);
    const localStorageKey = this.args.localStorageKey || 'tpk-theme';
    let theme = 'nord';
    if (typeof localStorage !== 'undefined') {
      theme = localStorage.getItem(localStorageKey) ?? 'nord';
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  THEMES = THEMES;

  @action
  setTheme(themeName: string) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    const localStorageKey = this.args.localStorageKey || 'tpk-theme';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(localStorageKey, themeName);
    }
  }

  <template>
    <div class='tpk-theme-selector'>
      {{! template-lint-disable no-inline-styles }}
      <button
        type='button'
        popovertarget='popover-theme-selector'
        style='anchor-name:--anchor-theme-selector'
        class='tpk-theme-selector-toggle'
      >
        <ThemeIcon />
        {{#unless @sidebarCollapsed}}
          <span>{{t 'global.theme'}}</span>
          <ChevronDownIcon class='size-4' />
        {{/unless}}
      </button>
      <ul
        class='tpk-theme-selector-menu'
        popover
        id='popover-theme-selector'
        style='position-anchor:--anchor-theme-selector'
      >
        <li class='tpk-theme-selector-menu-item'>{{t 'global.theme'}}</li>
        {{#each this.THEMES as |themeName|}}
          <li class='tpk-theme-selector-menu-item'>
            <button
              type='button'
              {{on 'click' (fn this.setTheme themeName)}}
              class='flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5'
            >
              <span
                data-theme={{themeName}}
                class='grid grid-cols-2 gap-0.5 p-0.5 rounded-sm'
              >
                <span class='w-2 h-2 rounded-sm bg-primary'></span>
                <span class='w-2 h-2 rounded-sm bg-secondary'></span>
                <span class='w-2 h-2 rounded-sm bg-accent'></span>
                <span class='w-2 h-2 rounded-sm bg-neutral'></span>
              </span>
              <span>{{themeName}}</span>
            </button>
          </li>
        {{/each}}
      </ul>
    </div>
  </template>
}
