import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiShowArgs {}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class UiShow extends Component<UiShowArgs> {
  @tracked open1: boolean = false;
  @tracked open2: boolean = false;
  @tracked open3: boolean = false;

  @action
  closed1() {
    this.open1 = false;
  }

  @action
  toggle1() {
    this.open1 = !this.open1;
  }

  @action
  closed2() {
    this.open2 = false;
  }

  @action
  toggle2() {
    this.open2 = !this.open2;
  }

  @action
  closed3() {
    this.open3 = false;
  }

  @action
  toggle3() {
    this.open3 = !this.open3;
  }
}
