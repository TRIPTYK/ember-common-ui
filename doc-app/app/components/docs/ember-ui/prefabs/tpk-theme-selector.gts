import Component from '@glimmer/component';
import TpkThemeSelector from '@triptyk/ember-ui/components/prefabs/tpk-theme-selector';

export default class TpkThemeSelectorExample extends Component {
  themes = ['light', 'dark', 'high-contrast'];

  <template>
    <TpkThemeSelector
      @themes={{this.themes}}
      @localStorageKey="doc-app-theme"
    />
  </template>
}
