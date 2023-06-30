import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';

export default class UiLazyImageComponent extends Component {
  @tracked isLoaded = false;

  @action imageLoaded() {
    this.isLoaded = true;
  }
}
