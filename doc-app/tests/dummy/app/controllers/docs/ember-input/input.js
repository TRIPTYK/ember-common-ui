import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkInputController extends Controller {
  @tracked value = '';

  @action
  onChange(value) {
    this.value = value;
  }
}
