import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import CatchState from '../services/catch-state';

export default class Substring extends Helper {
  @service declare catchState: CatchState;

  compute([state]: [unknown]) {
    this.catchState.state = state;
  }
}
