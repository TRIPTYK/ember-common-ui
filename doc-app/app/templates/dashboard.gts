import Component from '@glimmer/component';
import TpkDashBoard from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';

export default class DashboardTemplate extends Component {
  menuItems = [
    {
      label: 'Input validation prefab',
      route: 'dashboard.docs.ember-input-validation.prefabs.input',
      tooltip: 'Input validation prefab',
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
