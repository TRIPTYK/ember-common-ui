import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';

export interface LazyImageComponentSignature {
  Args: {
    defaultImage: string;
  };
  Element: HTMLImageElement;
  Blocks: {
    default: [];
  };
}

export default class TpkLazyImageComponent extends Component<LazyImageComponentSignature> {
  @tracked isLoaded = false;

  @action imageLoaded() {
    this.isLoaded = true;
  }

  <template>
    {{#if this.isLoaded}}
      <img ...attributes data-test-image-loaded={{this.isLoaded}} />
    {{else}}
      <img
        {{on 'load' this.imageLoaded}}
        data-test-image-loaded={{this.isLoaded}}
        ...attributes
        src={{@defaultImage}}
      />
    {{/if}}
  </template>
}
