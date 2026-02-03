import Component from '@glimmer/component';
import TpkDashBoard from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';

export default class DashboardTemplate extends Component {
  menuItems = [
    {
      label: 'Input validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.input',
      tooltip: 'Input validation prefab',
    },
    {
      label: 'Number validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.number',
      tooltip: 'Number validation prefab',
    },
    {
      label: 'Bic validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.bic',
      tooltip: 'Bic validation prefab',
    },
    {
      label: 'Currency validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.currency',
      tooltip: 'Currency validation prefab',
    },
    {
      label: 'Datepicker Range validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.datepicker-range',
      tooltip: 'Datepicker Range validation prefab',
    },
    {
      label: 'Datepicker validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.datepicker',
      tooltip: 'Datepicker validation prefab',
    },
    {
      label: 'Email validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.email',
      tooltip: 'Email validation prefab',
    },
    {
      label: 'File validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.file',
      tooltip: 'File validation prefab',
    },
    {
      label: 'File List validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.file-list',
      tooltip: 'File List validation prefab',
    },
    {
      label: 'Iban validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.iban',
      tooltip: 'Iban validation prefab',
    },
    {
      label: 'Integer validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.integer',
      tooltip: 'Integer validation prefab',
    },
    {
      label: 'Mobile validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.mobile',
      tooltip: 'Mobile validation prefab',
    },
    {
      label: 'National Number validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.national-number',
      tooltip: 'National Number validation prefab',
    },
    {
      label: 'Password validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.password',
      tooltip: 'Password validation prefab',
    },
    {
      label: 'Radio validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.radio',
      tooltip: 'Radio validation prefab',
    },
    {
      label: 'Radio Group validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.radio-group',
      tooltip: 'Radio Group validation prefab',
    },
    {
      label: 'Select validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.select',
      tooltip: 'Select validation prefab',
    },
    {
      label: 'Select Create validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.select-create',
      tooltip: 'Select Create validation prefab',
    },
    {
      label: 'Select Search validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.select-search',
      tooltip: 'Select Search validation prefab',
    },
    {
      label: 'Textarea validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.textarea',
      tooltip: 'Textarea validation prefab',
    },
    {
      label: 'Timepicker validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.timepicker',
      tooltip: 'Timepicker validation prefab',
    },
    {
      label: 'VAT validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.vat',
      tooltip: 'VAT validation prefab',
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
