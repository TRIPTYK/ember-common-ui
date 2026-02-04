import Component from '@glimmer/component';
import TpkDashBoard, {
  type Language,
  type SidebarItem,
} from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';
import type { TOC } from '@ember/component/template-only';
import ThemeSelector from 'doc-app/components/theme-selector';
import { service } from '@ember/service';
import type { IntlService } from 'ember-intl';
import { action } from '@ember/object';

export default class DashboardTemplate extends Component {
  @service declare intl: IntlService;

  languages: Language[] = [
    { code: 'fr-fr', label: 'Français' },
    { code: 'en-us', label: 'Anglais' },
  ];

  @action
  handleLocaleChange(locale: string) {
    this.intl.setLocale([locale]);
  }

  menuItems: SidebarItem[] = [
    {
      type: 'link',
      label: 'Getting Started',
      route: 'dashboard.docs.ember-input-validation.prefabs.input',
      icon: <template>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
      </template> as TOC<{ Element: SVGSVGElement }>,
    },
    {
      type: 'link',
      label: 'Installation',
      route: 'dashboard.docs.ember-input-validation.prefabs.input',
      icon: <template>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </template> as TOC<{ Element: SVGSVGElement }>,
    },
    {
      type: 'group',
      isOpen: true,
      label: 'Ember Input Validation Prefab',
      items: [
        {
          type: 'link',
          label: 'Input',
          route: 'dashboard.docs.ember-input-validation.prefabs.input',
        },
        {
          type: 'link',
          label: 'Integer',
          route: 'dashboard.docs.ember-input-validation.prefabs.integer',
        },
        {
          type: 'link',
          label: 'Number',
          route: 'dashboard.docs.ember-input-validation.prefabs.number',
        },
        {
          type: 'link',
          label: 'Datepicker',
          route: 'dashboard.docs.ember-input-validation.prefabs.datepicker',
        },
        {
          type: 'link',
          label: 'Datepicker Range',
          route:
            'dashboard.docs.ember-input-validation.prefabs.datepicker-range',
        },
        {
          type: 'link',
          label: 'Timepicker',
          route: 'dashboard.docs.ember-input-validation.prefabs.timepicker',
        },
        {
          type: 'link',
          label: 'Select',
          route: 'dashboard.docs.ember-input-validation.prefabs.select',
        },
        {
          type: 'link',
          label: 'Select Create',
          route: 'dashboard.docs.ember-input-validation.prefabs.select-create',
        },
        {
          type: 'link',
          label: 'Select Search',
          route: 'dashboard.docs.ember-input-validation.prefabs.select-search',
        },
        {
          type: 'link',
          label: 'Radio',
          route: 'dashboard.docs.ember-input-validation.prefabs.radio',
        },
        {
          type: 'link',
          label: 'Radio Group',
          route: 'dashboard.docs.ember-input-validation.prefabs.radio-group',
        },
        {
          type: 'link',
          label: 'Textarea',
          route: 'dashboard.docs.ember-input-validation.prefabs.textarea',
        },
        {
          type: 'link',
          label: 'Password',
          route: 'dashboard.docs.ember-input-validation.prefabs.password',
        },
        {
          type: 'link',
          label: 'Email',
          route: 'dashboard.docs.ember-input-validation.prefabs.email',
        },
        {
          type: 'link',
          label: 'Mobile',
          route: 'dashboard.docs.ember-input-validation.prefabs.mobile',
        },
        {
          type: 'link',
          label: 'File',
          route: 'dashboard.docs.ember-input-validation.prefabs.file',
        },
        {
          type: 'link',
          label: 'File List',
          route: 'dashboard.docs.ember-input-validation.prefabs.file-list',
        },
        {
          type: 'link',
          label: 'Currency',
          route: 'dashboard.docs.ember-input-validation.prefabs.currency',
        },
        {
          type: 'link',
          label: 'BIC',
          route: 'dashboard.docs.ember-input-validation.prefabs.bic',
        },
        {
          type: 'link',
          label: 'IBAN',
          route: 'dashboard.docs.ember-input-validation.prefabs.iban',
        },
        {
          type: 'link',
          label: 'VAT',
          route: 'dashboard.docs.ember-input-validation.prefabs.vat',
        },
        {
          type: 'link',
          label: 'National Number',
          route:
            'dashboard.docs.ember-input-validation.prefabs.national-number',
        },
      ],
    },
    {
      type: 'group',
      label: 'Ember UI Prefab',
      items: [
        {
          type: 'link',
          label: 'Confirm Modal',
          route: 'dashboard.docs.ember-ui.prefabs.confirm-modal',
        },
        {
          type: 'link',
          label: 'Table Generic',
          route: 'dashboard.docs.ember-ui.prefabs.table-generic',
        },
        {
          type: 'link',
          label: 'Tpk Form',
          route: 'dashboard.docs.ember-ui.prefabs.tpk-form',
        },
      ],
    },
    {
      type: 'group',
      label: 'Ember Input Prefab',
      items: [
        {
          type: 'link',
          label: 'Button Prefab',
          route: 'dashboard.docs.ember-input.prefabs.button',
        },
        {
          type: 'link',
          label: 'Toggle',
          route: 'dashboard.docs.ember-input.prefabs.toggle',
        },
      ],
    },
  ];

  <template>
    <div class="tpk-dashboard-wrapper h-screen w-full overflow-hidden">
      <TpkDashBoard
        @title="EMBER COMMON UI"
        @profileRoute="application"
        @sidebarItems={{this.menuItems}}
        @languages={{this.languages}}
        @onLocaleChange={{this.handleLocaleChange}}
      >
        <:header>
          <div class="flex flex-col items-center justify-center p-2">
            <img
              src="/assets/img/ember_common_ui_logo.svg"
              alt="EMBER COMMON UI"
              class="w-24 object-contain"
            />
            <h2 class="font-bold text-lg">EMBER COMMON UI</h2>
          </div>
        </:header>
        <:footer>
          <div class="flex items-center justify-between w-full p-2 px-4 gap-3">
            <div class="flex items-center gap-3">
              <a
                href="https://github.com/triptyk/ember-common-ui"
                target="_blank"
                rel="noopener noreferrer"
                class="tooltip"
                data-tip="GitHub"
              >
                <svg
                  class="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  />
                </svg>
              </a>
              <a
                href="https://triptyk.eu"
                target="_blank"
                rel="noopener noreferrer"
                class="tooltip"
                data-tip="Our website"
              >
                <svg
                  class="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path
                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                  />
                </svg>
              </a>
              <a
                href="https://facebook.com/triptykdigital"
                target="_blank"
                rel="noopener noreferrer"
                class="tooltip"
                data-tip="Facebook"
              >
                <svg
                  class="size-5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path
                    d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
                  />
                </svg>
              </a>
            </div>
            <ThemeSelector />
          </div>
        </:footer>
        <:content>
          <div class="p-8">
            {{outlet}}
          </div>
        </:content>
      </TpkDashBoard>
    </div>
  </template>
}
