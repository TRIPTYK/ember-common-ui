import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import TpkPrefabButton from '@triptyk/ember-input/components/prefabs/tpk-prefab-button';

export default class ButtonExample extends Component {
  @tracked counter = 0;

  @action
  incrementCounter() {
    this.counter++;
  }

  <template>
    <div class="gap-y-4">
      <div class="pb-4">
        <TpkPrefabButton
          @onClick={{this.incrementCounter}}
          @label="Button Enabled"
        />
      </div>
      <p>count = {{this.counter}}</p>
    </div>
  </template>
}
