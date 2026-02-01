import Component from '@glimmer/component';
import TpkDashBoard from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';

export default class DashboardTemplate extends Component {
  menuItems = [
    {
      label: 'Dashboard',
      route: 'dashboard',
      tooltip: 'Dashboard',
    },

    <template>
      <TpkDashBoard
        @currentUser={{this.userForNav}}
        @onLogout={{this.logout}}
        @sidebarItems={{this.menuItems}}
      >
        {{outlet}}
      </TpkDashBoard>
    </template>,
  ];
}
