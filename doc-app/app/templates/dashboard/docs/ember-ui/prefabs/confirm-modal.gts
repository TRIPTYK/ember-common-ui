import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import ConfirmModalExample from 'doc-app/components/docs/ember-ui/prefabs/confirm-modal.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface ConfirmModalPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class ConfirmModalPrefabDocs extends Component<ConfirmModalPrefabDocsSignature> {
  @service declare intl: IntlService;

  confirmModal = `
  <Prefabs::TpkConfirmModalPrefab
    @onClose={{this.onClose}}
    @onConfirm={{this.onConfirm}}
    @cancelText="Annuler"
    @confirmText="Confirmer"
    @confirmQuestion={{this.confirmQuestion}}
    @isOpen={{this.isOpen}}
  />
  `;

  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.confirm-modal.title"}}
      @description={{t "ember-ui.prefabs.confirm-modal.description"}}
    >
      <DocSection @title={{t "ember-ui.prefabs.confirm-modal.examples.title"}}>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.confirm-modal.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <ConfirmModalExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.confirmModal}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
