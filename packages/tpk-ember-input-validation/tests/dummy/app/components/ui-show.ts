import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiShowArgs {}

export default class UiShow extends Component<UiShowArgs> {
  @tracked checked: boolean = false;
  @tracked input: string = '';
  @tracked inputArea: string = '';

  get hasError() {
    return this.input.length < 2;
  }

  @action
  setChecked(checked: boolean) {
    this.checked = checked;
  }

  @action
  onChangeArea(value: string) {
    this.inputArea = value;
  }

  @action
  onChange(value: string) {
    this.input = value;
  }

  @action
  iconClick() {
    console.log('click');
  }
}
