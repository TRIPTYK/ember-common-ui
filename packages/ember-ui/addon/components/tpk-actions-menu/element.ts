import Component from '@glimmer/component';

export interface ActionsMenuElementComponentArgs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAction: (...args: any[]) => unknown;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class ActionsMenuElementComponent extends Component<ActionsMenuElementComponentArgs> {}
