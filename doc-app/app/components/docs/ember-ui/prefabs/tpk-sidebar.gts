import Component from '@glimmer/component';
import TpkSidebar from '@triptyk/ember-ui/components/prefabs/tpk-sidebar';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TpkSidebarExample extends Component {
  @tracked collapsed = false;

  sidebarItems = [
    { type: 'link' as const, label: 'Dashboard', route: 'dashboard' },
    { type: 'link' as const, label: 'Settings', route: 'dashboard' },
    {
      type: 'group' as const,
      label: 'Components',
      items: [
        { type: 'link' as const, label: 'Inputs', route: 'dashboard' },
        { type: 'link' as const, label: 'Forms', route: 'dashboard' },
      ],
    },
  ];

  @action
  onCollapsedChange(collapsed: boolean) {
    this.collapsed = collapsed;
  }

  <template>
    {{! template-lint-disable no-inline-styles }}
    <div style="height: 300px; position: relative;">
      <TpkSidebar
        @sidebarItems={{this.sidebarItems}}
        @collapsed={{this.collapsed}}
        @onCollapsedChange={{this.onCollapsedChange}}
      />
    </div>
  </template>
}
