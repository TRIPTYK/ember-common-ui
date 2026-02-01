import { service } from '@ember/service';
import Component from '@glimmer/component';
import type { IntlService } from 'ember-intl';

interface DocSectionSignature {
  Args: {
    title: string;
    id?: string;
  };
  Blocks: {
    default: [];
  };
}

export default class DocSectionComponent extends Component<DocSectionSignature> {
  @service declare intl: IntlService;

  <template>
    <section class="doc-section mb-12" id={{@id}}>
      <h2 class="text-2xl font-semibold mb-4">{{@title}}</h2>
      <div class="doc-section-content">
        {{yield}}
      </div>
    </section>
  </template>
}
