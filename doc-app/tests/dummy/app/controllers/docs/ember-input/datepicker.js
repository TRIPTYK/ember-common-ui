import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkDatepickerController extends Controller {
  @tracked date = new Date();

  @action
  async setDate(date) {
    this.date = date;
  }
}
