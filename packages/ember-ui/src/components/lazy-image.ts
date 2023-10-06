import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';

export interface LazyImageComponentSignature {
  Args: {
    src: string;
    alt: string;
    class?: string;
    defaultImage: string;
  };
  Element: HTMLImageElement;
}

export default class LazyImageComponent extends Component<LazyImageComponentSignature> {
  @tracked isLoaded = false;

  @action imageLoaded() {
    this.isLoaded = true;
  }
}
