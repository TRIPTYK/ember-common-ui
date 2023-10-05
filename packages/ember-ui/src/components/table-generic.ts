import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class TableGeneric extends Component {
  @tracked filterText?: string;

  @action
  onSearch(value: string) {
    this.filterText = value;
  }
}
