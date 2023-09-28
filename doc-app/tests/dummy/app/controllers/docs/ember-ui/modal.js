import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsModalController extends Controller {
  @tracked isOpen = false;
  @tracked title = '';

  @action
  open() {
    this.isOpen = true;
  }

  @action
  onClose() {
    this.isOpen = false;
  }
}
