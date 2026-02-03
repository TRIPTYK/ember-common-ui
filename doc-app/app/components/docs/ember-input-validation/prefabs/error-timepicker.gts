import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkTimepickerPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-timepicker';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorTimepickerExample extends Component {
  @tracked changeset = new ImmerChangeset({
    time: null,
  });

  @action
  onChange(value: Date[]) {
    if (!value) {
      this.changeset.addError({
        message: 'Please select a time',
        value: 'err',
        originalValue: '',
        key: 'time',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Please select a time',
        value: 'err',
        originalValue: '',
        key: 'time',
      });
    }, 0);
  }

  <template>
    <TpkTimepickerPrefab
      @label="Error"
      @changeset={{this.changeset}}
      @validationField="time"
      @onChange={{this.onChange}}
    />
  </template>
}
