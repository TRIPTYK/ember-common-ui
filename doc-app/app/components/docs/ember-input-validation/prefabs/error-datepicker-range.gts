import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkDatepickerRangePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker-range';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorDatepickerRangeExample extends Component {
  @tracked changeset = new ImmerChangeset({
    error: null,
  });

  @action
  onChange(value: Date[] | null) {
    if (value && value.length === 2) {
      const [startDate, endDate] = value;
      if (!endDate || !startDate) {
        this.changeset.addError({
          message: 'need a start and end date',
          value: 'err',
          originalValue: null,
          key: 'error',
        });
        return;
      }

      const daysDiff = Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff > 30) {
        this.changeset.addError({
          message: 'Date range cannot exceed 30 days',
          value: 'err',
          originalValue: null,
          key: 'error',
        });
      } else {
        this.changeset.removeErrors();
      }
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Please select a valid date range',
        value: 'err',
        originalValue: null,
        key: 'error',
      });
    }, 0);
  }

  <template>
    <TpkDatepickerRangePrefab
      @label="Datepicker Range"
      @changeset={{this.changeset}}
      @validationField="error"
      @onChange={{this.onChange}}
    />
  </template>
}
