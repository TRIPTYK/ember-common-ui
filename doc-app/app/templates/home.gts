import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import TpkDashBoard, {
  type SidebarItem,
  type Language,
} from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';
import type { TOC } from '@ember/component/template-only';
import ThemeSelector from 'doc-app/components/theme-selector';
import { hash } from '@ember/helper';
import type { IntlService } from 'ember-intl';

export default class DashboardTemplate extends Component {
  @service declare intl: IntlService;
  @tracked sidebarCollapsed = false;

  languages: Language[] = [
    { code: 'fr-fr', label: 'Français' },
    { code: 'en-us', label: 'Anglais' },
  ];

  @action
  logout() {
    console.log('logout');
  }
  @action
  handleCollapsedChange(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }

  @action
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  @action
  handleLocaleChange(locale: string) {
    this.intl.setLocale([locale]);
  }

  menuItems: SidebarItem[] = [
    {
      type: 'link',
      label: 'Accueil',
      route: 'home',
      icon: <template>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </template> as TOC<{ Element: SVGSVGElement }>,
    },
    {
      type: 'link',
      label: 'Commandes',
      route: 'dashboard.docs.ember-input-validation.prefabs.input',
      icon: <template>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
          />
        </svg>
      </template> as TOC<{ Element: SVGSVGElement }>,
    },
    {
      type: 'link',
      label: 'Notifications',
      route: 'dashboard.docs.ember-input-validation.prefabs.input',
      icon: <template>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>
      </template> as TOC<{ Element: SVGSVGElement }>,
    },
    {
      type: 'link',
      label: 'Paramètres',
      route: 'dashboard.docs.ember-input-validation.prefabs.input',
      icon: <template>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </template> as TOC<{ Element: SVGSVGElement }>,
    },
  ];

  <template>
    <div class="tpk-dashboard-wrapper h-screen w-full overflow-hidden">
      <TpkDashBoard
        @profileRoute="application"
        @sidebarItems={{this.menuItems}}
        @collapsed={{this.sidebarCollapsed}}
        @onCollapsedChange={{this.handleCollapsedChange}}
        @onSidebarToggle={{this.toggleSidebar}}
        @languages={{this.languages}}
        @onLocaleChange={{this.handleLocaleChange}}
        @currentUser={{hash fullName="John Doe"}}
        @onLogout={{this.logout}}
        @logoutLabel="Logout"
        @profileLabel="My Profile"
      >
        <:header>
          <div class="flex flex-col items-center justify-center p-2">
            <img
              src="/assets/img/ember_common_ui_logo.svg"
              alt="EMBER COMMON UI"
              class="w-24 object-contain"
            />
            {{#unless this.sidebarCollapsed}}
              <h2 class="font-bold text-lg">EMBER COMMON UI</h2>
            {{/unless}}
          </div>
        </:header>
        <:content>
          <div class="p-8">
            {{outlet}}
          </div>
        </:content>
        <:footer>
          <div class="flex items-center justify-center w-full p-2 px-4">
            <ThemeSelector @sidebarCollapsed={{this.sidebarCollapsed}} />
          </div>
        </:footer>
        <:menu>
          <li>
            <button type="button">
              Synchronisation
            </button>
          </li>
        </:menu>
      </TpkDashBoard>
    </div>
  </template>
}
