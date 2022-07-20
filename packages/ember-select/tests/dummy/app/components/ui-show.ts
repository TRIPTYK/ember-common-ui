import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiShowArgs {}

export default class UiShow extends Component<UiShowArgs> {
  @tracked value = '';

  options = [];
  @action
  setValue(value: any) {
    this.value = value.value;
  }

  @action
  search() {}
}
