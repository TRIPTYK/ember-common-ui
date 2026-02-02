// doc-app/app/components/doc/page.gts
import Component from '@glimmer/component';
import { service } from '@ember/service';
import type IntlService from 'ember-intl/services/intl';

interface DocPageSignature {
  Args: {
    title: string;
    description?: string;
  };
  Blocks: {
    default: [];
  };
}

export default class DocPageComponent extends Component<DocPageSignature> {
  @service declare intl: IntlService;

  <template>
    <div class="doc-page">
      <div class="doc-page-header">
        <h1 class="text-4xl font-bold mb-4">{{@title}}</h1>
        {{#if @description}}
          <p class="text-lg text-gray-600 mb-8">{{@description}}</p>
        {{/if}}
      </div>

      <div class="doc-page-content">
        {{yield}}
      </div>
    </div>
  </template>
}
