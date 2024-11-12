import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkButtonController extends Controller {
  @tracked counter = 0;

  @action
  async incrementCounter() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.counter++;
  }
}
