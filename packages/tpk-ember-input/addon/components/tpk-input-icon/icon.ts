import { action } from '@ember/object';
import Component from '@glimmer/component';

interface TpkInputIconIconArgs {
  onClick: () => unknown;
}

export default class TpkInputIconIcon extends Component<TpkInputIconIconArgs> {
  @action
  iconClicked() {
    console.log('clicl');
    this.args.onClick?.();
  }
}
