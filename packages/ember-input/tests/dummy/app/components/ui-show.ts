import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiShowArgs {}

export default class UiShow extends Component<UiShowArgs> {
  @tracked checked: boolean = false;
  @tracked radio: string = 'amaury';
  @tracked input: string = '';
  @tracked inputMask: string = '';
  @tracked inputMaskComplex: string = 'BE';
  @tracked inputArea: string = '';
  @tracked selectedDate: Date | string = '';

  complexOptionsMasked = {
    mask: '{TVA: }&&[&]000000000[0000]',
    lazy: false,
    definitions: {
      '&': /[A-Z]/,
    },
  };

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
  onChangeMask(value: string) {
    this.inputMask = value;
  }

  @action
  onChangeMaskComplex(value: string) {
    this.inputMaskComplex = value;
  }

  @action
  iconClick() {}

  @action
  setDate(dates: Date[]) {
    this.selectedDate = dates[0];
  }
}
