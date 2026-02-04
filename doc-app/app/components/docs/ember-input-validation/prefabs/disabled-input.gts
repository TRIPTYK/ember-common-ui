// doc-app/app/components/examples/input-validation/disabled-input.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkInputPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';

export default class DisabledInputExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 'This is disabled',
  });

  validationSchema = object({
    disabled: string(),
  });

  <template>
    <TpkInputPrefab
      @label="Disabled Input"
      @changeset={{this.changeset}}
      @validationField="something"
      @disabled={{true}}
    />
  </template>
}
