import Component from '@glimmer/component';
import TpkTogglePrefabComponent from '@triptyk/ember-input/components/prefabs/tpk-toggle';

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class DisabledToggleExample extends Component {
  <template>
    <TpkTogglePrefabComponent
      @checked={{true}}
      @disabled={{true}}
      @label="Toggle Input"
    />
  </template>
}
