import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import type Owner from '@ember/owner';

const THEMES = ['nord', 'dracula', 'cupcake', 'corporate', 'lemonade'] as const;

interface ThemeSelectorSignature {
  Args: {
    sidebarCollapsed?: boolean;
  };
}

export default class ThemeSelector extends Component<ThemeSelectorSignature> {
  @tracked currentTheme = 'nord';
  @tracked themeDropdownOpen = false;

  constructor(owner: Owner, args: ThemeSelectorSignature['Args']) {
    super(owner, args);
    let theme = 'nord';
    if (typeof localStorage !== 'undefined') {
      theme = localStorage.getItem('doc-app-theme') ?? 'nord';
    }
    this.currentTheme = theme;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  THEMES = THEMES;

  @action
  setTheme(themeName: string) {
    this.currentTheme = themeName;
    this.themeDropdownOpen = false;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('doc-app-theme', themeName);
    }
  }

  @action
  toggleThemeDropdown() {
    this.themeDropdownOpen = !this.themeDropdownOpen;
  }

  @action
  isCurrentTheme(themeName: string): boolean {
    return this.currentTheme === themeName;
  }

  <template>
    <div
      class="dropdown dropdown-top
        {{if @sidebarCollapsed 'dropdown-right dropdown-end' 'dropdown-start'}}
        {{if this.themeDropdownOpen 'dropdown-open'}}"
    >
      <button
        type="button"
        class="btn btn-ghost btn-sm gap-1"
        {{on "click" this.toggleThemeDropdown}}
      >
        <svg
          class="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        {{#unless @sidebarCollapsed}}
          <span>Theme</span>
          <svg
            class="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        {{/unless}}
      </button>
      <ul
        class="dropdown-content menu bg-base-200 rounded-box z-50 w-52 p-2 shadow"
      >
        <li class="menu-title px-2 py-1 text-base-content/70">Theme</li>
        {{#each this.THEMES as |themeName|}}
          <li>
            <button
              type="button"
              {{on "click" (fn this.setTheme themeName)}}
              class="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5
                {{if (this.isCurrentTheme themeName) 'active'}}"
            >
              <span
                data-theme={{themeName}}
                class="grid grid-cols-2 gap-0.5 p-0.5 rounded-sm"
              >
                <span class="w-2 h-2 rounded-sm bg-primary"></span>
                <span class="w-2 h-2 rounded-sm bg-secondary"></span>
                <span class="w-2 h-2 rounded-sm bg-accent"></span>
                <span class="w-2 h-2 rounded-sm bg-neutral"></span>
              </span>
              <span>{{themeName}}</span>
            </button>
          </li>
        {{/each}}
      </ul>
    </div>
  </template>
}
