import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiShowArgs {}

export default class UiShow extends Component<UiShowArgs> {
  @tracked value = '';

  options = [
    { id: 1, text: 'Monkey D. Luffy', value: 1 },
    { id: 1, text: 'Joe Boy', value: 2 },
    { id: 2, text: 'Gol D. Roger', value: 5678 },
  ];
  @action
  setValue(value: any) {
    this.value = value.value;
  }
}
