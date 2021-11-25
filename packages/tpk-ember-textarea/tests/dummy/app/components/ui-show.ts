import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiShowArgs {}

export default class UiShow extends Component<UiShowArgs> {
  @tracked valueSimple = '';
  @tracked valuePassword = '';
  @tracked valueLimit = '';
  @tracked valueError = '';
  @tracked valueInfo = '';

  @action
  setValueSimple(value: string) {
    this.valueSimple = value;
  }
  
  @action
  setValuePassword(value: string) {
    this.valuePassword = value;
  }

  @action
  setValueLimit(value: string) {
    this.valueLimit = value;
  }

  @action
  setValueError(value: string) {
    this.valueError = value;
  }

  @action
  setValueInfo(value: string) {
    this.valueInfo = value;
  }
}
