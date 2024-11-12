import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkCheckboxController extends Controller {
  @tracked value =
    `Tomster was the first of many friendly faces of the Ember project and community... Read more at https://emberjs.com/mascots/`;

  @action
  onChange(value) {
    this.value = value;
  }
}
