import Component from '@glimmer/component';

export default class LoadingIndicator extends Component {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'loading-indicator': typeof LoadingIndicator;
    LoadingIndicator: typeof LoadingIndicator;
  }
}
