import TpkInput from './tpk-input';
import { TpkInputArgs } from './tpk-input';

interface TpkInputIconArgs extends TpkInputArgs {
  onIconClick: () => unknown;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkInputIcon extends TpkInput<TpkInputIconArgs> {}
