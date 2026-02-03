import Component from '@glimmer/component';
import TpkDashBoard from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';

export default class DashboardTemplate extends Component {
  menuItems: SidebarItem[] = [
    {
      type: 'group',
      label: 'Ember Input Validation Prefab',
      tooltip: 'Ember Input Validation Prefab',
      items: [
        {
          type: 'link',
          label: 'Input',
          route: 'dashboard.docs.ember-input-validation.prefabs.input',
          tooltip: 'Input validation prefab',
        },
        {
          type: 'link',
          label: 'Integer',
          route: 'dashboard.docs.ember-input-validation.prefabs.integer',
          tooltip: 'Integer validation prefab',
        },
        {
          type: 'link',
          label: 'Number',
          route: 'dashboard.docs.ember-input-validation.prefabs.number',
          tooltip: 'Number validation prefab',
        },
        {
          type: 'link',
          label: 'Datepicker',
          route: 'dashboard.docs.ember-input-validation.prefabs.datepicker',
          tooltip: 'Datepicker validation prefab',
        },
        {
          type: 'link',
          label: 'Datepicker Range',
          route:
            'dashboard.docs.ember-input-validation.prefabs.datepicker-range',
          tooltip: 'Datepicker Range validation prefab',
        },
        {
          type: 'link',
          label: 'Timepicker',
          route: 'dashboard.docs.ember-input-validation.prefabs.timepicker',
          tooltip: 'Timepicker validation prefab',
        },
        {
          type: 'link',
          label: 'Select',
          route: 'dashboard.docs.ember-input-validation.prefabs.select',
          tooltip: 'Select validation prefab',
        },
        {
          type: 'link',
          label: 'Select Create',
          route: 'dashboard.docs.ember-input-validation.prefabs.select-create',
          tooltip: 'Select Create validation prefab',
        },
        {
          type: 'link',
          label: 'Select Search',
          route: 'dashboard.docs.ember-input-validation.prefabs.select-search',
          tooltip: 'Select Search validation prefab',
        },
        {
          type: 'link',
          label: 'Radio',
          route: 'dashboard.docs.ember-input-validation.prefabs.radio',
          tooltip: 'Radio validation prefab',
        },
        {
          type: 'link',
          label: 'Radio Group',
          route: 'dashboard.docs.ember-input-validation.prefabs.radio-group',
          tooltip: 'Radio Group validation prefab',
        },
        {
          type: 'link',
          label: 'Textarea',
          route: 'dashboard.docs.ember-input-validation.prefabs.textarea',
          tooltip: 'Textarea validation prefab',
        },
        {
          type: 'link',
          label: 'Password',
          route: 'dashboard.docs.ember-input-validation.prefabs.password',
          tooltip: 'Password validation prefab',
        },
        {
          type: 'link',
          label: 'Email',
          route: 'dashboard.docs.ember-input-validation.prefabs.email',
          tooltip: 'Email validation prefab',
        },
        {
          type: 'link',
          label: 'Mobile',
          route: 'dashboard.docs.ember-input-validation.prefabs.mobile',
          tooltip: 'Mobile validation prefab',
        },
        {
          type: 'link',
          label: 'File',
          route: 'dashboard.docs.ember-input-validation.prefabs.file',
          tooltip: 'File validation prefab',
        },
        {
          type: 'link',
          label: 'File List',
          route: 'dashboard.docs.ember-input-validation.prefabs.file-list',
          tooltip: 'File List validation prefab',
        },
        {
          type: 'link',
          label: 'Currency',
          route: 'dashboard.docs.ember-input-validation.prefabs.currency',
          tooltip: 'Currency validation prefab',
        },
        {
          type: 'link',
          label: 'BIC',
          route: 'dashboard.docs.ember-input-validation.prefabs.bic',
          tooltip: 'Bic validation prefab',
        },
        {
          type: 'link',
          label: 'IBAN',
          route: 'dashboard.docs.ember-input-validation.prefabs.iban',
          tooltip: 'Iban validation prefab',
        },
        {
          type: 'link',
          label: 'VAT',
          route: 'dashboard.docs.ember-input-validation.prefabs.vat',
          tooltip: 'VAT validation prefab',
        },
        {
          type: 'link',
          label: 'National Number',
          route:
            'dashboard.docs.ember-input-validation.prefabs.national-number',
          tooltip: 'National Number validation prefab',
        },
      ],
    },
  ];

  <template>
    <div class="w-full xl:max-w-480 xl:mx-auto">
      <TpkDashBoard
        @title="EMBER COMMON UI"
        @profileRoute="application"
        @sidebarItems={{this.menuItems}}
      >
        <div class="p-8">
          {{outlet}}
        </div>
      </TpkDashBoard>
    </div>
  </template>
}
