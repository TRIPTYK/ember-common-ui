import Component from '@glimmer/component';

interface TpkStepperStepHeaderArgs {
  guid: string;
}

export default class TpkStepperStepHeader extends Component<TpkStepperStepHeaderArgs> {
  get container() {
    return document.getElementById(this.args.guid);
  }
}
