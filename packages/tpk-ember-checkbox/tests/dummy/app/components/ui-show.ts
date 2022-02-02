import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiShowArgs {}

export default class UiShow extends Component<UiShowArgs> {
  @tracked checked: boolean = false;
  value: string = 'covid';

  @action
  setChecked(checked: boolean) {
    this.checked = checked;
  }
}
