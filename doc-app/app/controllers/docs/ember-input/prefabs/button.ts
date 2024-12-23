import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class DocsTpkPrefabButtonController extends Controller {
  @tracked counter = 0;

  @action
  async incrementCounter() {
    this.counter++;    
  }
}