import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiShowArgs {}

export default class UiShow extends Component<UiShowArgs> {
  @tracked value = '';

  options = ['a', 'b', 'c'];
  @action
  setValue(value: any) {
    console.log(value);
    this.value = value;
  }

  @action
  search() {}
}
