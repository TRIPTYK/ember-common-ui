import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkCheckboxController extends Controller {
  @tracked value = 'coucou';

  @action
  onChange(value) {
    this.value = value;
  }
}
