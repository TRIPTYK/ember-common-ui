import Component from '@glimmer/component';

export interface LoadingIndicatorComponentSignature {
  Element: HTMLDivElement;
}

export default class LoadingIndicator extends Component<LoadingIndicatorComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'loading-indicator': typeof LoadingIndicator;
    LoadingIndicator: typeof LoadingIndicator;
  }
}
