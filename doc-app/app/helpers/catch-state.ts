import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import CatchState from '../services/catch-state';

export default class Substring extends Helper<any> {
  @service declare catchState: CatchState;

  compute([state]: [any]) {
    this.catchState.state = state;
  }
}
