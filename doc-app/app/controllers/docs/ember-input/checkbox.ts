import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkCheckboxController extends Controller {
  @tracked checked = false;

  @action
  onChange(checked: boolean) {
    this.checked = checked;
  }
}
