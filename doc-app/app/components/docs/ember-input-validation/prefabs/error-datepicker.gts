// doc-app/app/components/docs/ember-input-validation/prefabs/error-datepicker.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkDatepickerPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorDatepickerExample extends Component {
  @tracked changeset = new ImmerChangeset({
    birthday: null,
  });

  @action
  onChange(value: Date[]) {
    if (!Array.isArray(value) || value.length === 0) {
      this.changeset.addError({
        message: 'need a start and end date',
        value: 'err',
        originalValue: null,
        key: 'error',
      });
      return;
    }
    const dateValue = value[0];
    if (dateValue && dateValue > new Date()) {
      this.changeset.addError({
        message: 'Date must be in the past',
        value: 'err',
        originalValue: null,
        key: 'birthday',
      });
    } else if (dateValue) {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Please select a date',
        value: 'err',
        originalValue: null,
        key: 'birthday',
      });
    }, 0);
  }

  <template>
    <TpkDatepickerPrefab
      @label="Datepicker with Error"
      @changeset={{this.changeset}}
      @validationField="birthday"
      @onChange={{this.onChange}}
    />
  </template>
}
