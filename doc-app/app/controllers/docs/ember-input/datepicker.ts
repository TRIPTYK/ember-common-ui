import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkDatepickerController extends Controller {
  @tracked selectedDate?: Date;
  @tracked selectedDates?: Date[];
  @tracked date = new Date(2022, 10, 15);
  @tracked minDate = new Date(2022, 10, 13);
  @tracked maxDate = new Date(2022, 10, 16);

  @action
  onChange(dates: [Date, Date]) {
    this.selectedDate = dates[0];
  }

  @action
  onChangeRange(dates: [Date, Date]) {
    this.selectedDates = dates;
  }
}
