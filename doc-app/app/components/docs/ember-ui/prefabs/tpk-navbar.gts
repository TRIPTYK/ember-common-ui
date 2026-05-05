import Component from '@glimmer/component';
import TpkNavbar from '@triptyk/ember-ui/components/prefabs/tpk-navbar';
import { action } from '@ember/object';

export default class TpkNavbarExample extends Component {
  navbarItems = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
  ];

  currentUser = { fullName: 'Jane Doe' };

  @action
  onLogout() {
    alert('Logged out');
  }

  <template>
    <TpkNavbar
      @title="My App"
      @navbarItems={{this.navbarItems}}
      @currentUser={{this.currentUser}}
      @onLogout={{this.onLogout}}
    />
  </template>
}
