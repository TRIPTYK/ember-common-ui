import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import CatchState from '../services/catch-state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class CatchStateHelper extends Helper<any> {
  @service declare catchState: CatchState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compute([state]: [any]) {
    this.catchState.state = state;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state;
  }
}
