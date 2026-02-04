import Component from '@glimmer/component';
import TpkTogglePrefab from '@triptyk/ember-input/components/prefabs/tpk-toggle';

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class ToggleExample extends Component {
  <template>
    <TpkTogglePrefab @checked={{true}} @label="Toggle Input" />
  </template>
}
