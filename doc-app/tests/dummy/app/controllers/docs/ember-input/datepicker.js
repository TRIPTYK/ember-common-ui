import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkDatepickerController extends Controller {
  @tracked selectedDate = undefined;
  @tracked selectedDates = undefined;
  @tracked date = new Date(2022, 10, 15);
  @tracked minDate = new Date(2022, 10, 13);
  @tracked maxDate = new Date(2022, 10, 16);

  @action
  onChange(dates) {
    this.selectedDate = dates[0];
  }

  @action
  onChangeRange(dates) {
    this.selectedDates = dates;
  }
}
