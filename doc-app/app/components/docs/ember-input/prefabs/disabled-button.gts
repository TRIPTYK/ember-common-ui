import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import TpkPrefabButton from '@triptyk/ember-input/components/prefabs/tpk-prefab-button';

export default class DisabledButtonExample extends Component {
  @tracked counter = 0;

  @action
  incrementCounter() {
    this.counter++;
  }

  <template>
    <div class="pb-4">
      <TpkPrefabButton
        @onClick={{this.incrementCounter}}
        @disabled={{true}}
        @label="Button Disabled"
      />
    </div>
  </template>
}
