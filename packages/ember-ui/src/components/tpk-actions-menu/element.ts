import Component from '@glimmer/component';

export interface ActionsMenuElementComponentSignature {
  Args: {
    handleAction: (...args: unknown[]) => unknown;
    action: string;
    icon: string;
    label: string;
  };
  Element: HTMLLIElement;
  Blocks: {
    default: [];
  };
}

export default class ActionsMenuElementComponent extends Component<ActionsMenuElementComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-actions-menu/element': typeof ActionsMenuElementComponent;
  }
}
