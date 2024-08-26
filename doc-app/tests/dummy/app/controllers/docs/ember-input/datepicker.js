import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkDatepickerController extends Controller {
  @tracked selectedDate = null;
  @tracked isDisabled = false;
  @tracked dateMask = 'd-m/Y';
  @tracked placeholderText = 'Enter a date';
  @tracked dateFormat = 'd/m/Y';
  @tracked dateLabel = 'Select a date:';
  @tracked allowInput = true;
  @tracked enableTime = true;

  @action
  onChange(newDate, event) {
    this.selectedDate = newDate;
  }
}
