import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiShowArgs {}

export default class UiShow extends Component<UiShowArgs> {
  @tracked checked: boolean = false;
  @tracked radio: string = 'amaury';
  @tracked input: string = '';
  @tracked inputArea: string = '';
  @tracked selectedDate: Date | string = '';

  get hasError() {
    return this.input.length < 2;
  }

  @action
  setChecked(checked: boolean) {
    this.checked = checked;
  }

  @action
  setRadio(value: string) {
    this.radio = value;
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
  iconClick() {}

  @action
  setDate(dates: Date[]) {
    this.selectedDate = dates[0];
  }
}
