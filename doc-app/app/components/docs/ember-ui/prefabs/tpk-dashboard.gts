import Component from '@glimmer/component';
import TpkDashboard from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';
import { hash } from '@ember/helper';
import type { SidebarItem } from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';

export default class TpkDashboardExample extends Component {
  sidebarItems: SidebarItem[] = [
    {
      type: 'group',
      label: 'Pages',
      items: [
        { type: 'link', label: 'Home', route: 'dashboard' },
        { type: 'link', label: 'Settings', route: 'dashboard' },
      ],
    },
  ];

  <template>
    <div class="h-[105] border border-gray-200 rounded-lg overflow-hidden">
      <TpkDashboard
        @title="My App"
        @sidebarItems={{this.sidebarItems}}
        @currentUser={{hash fullName="John Doe"}}
        @logoutLabel="Logout"
        @profileLabel="Profile"
      >
        <:header>
          <div class="p-4 font-bold text-lg">My App</div>
        </:header>
        <:content>
          <div class="p-8">
            <h1 class="text-2xl font-bold mb-2">Welcome!</h1>
            <p class="text-gray-600">This is the main content area.</p>
          </div>
        </:content>
        <:footer>
          <div class="p-4 text-sm text-gray-400">© 2025 My App</div>
        </:footer>
      </TpkDashboard>
    </div>
  </template>
}
