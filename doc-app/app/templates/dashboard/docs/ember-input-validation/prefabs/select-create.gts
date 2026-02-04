import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicSelectCreateExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-select-create.gts';
import DisabledSelectCreateExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-select-create.gts';
import ErrorSelectCreateExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-select-create.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface SelectCreatePrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class SelectCreatePrefabDocs extends Component<SelectCreatePrefabDocsSignature> {
  @service declare intl: IntlService;

  selectCreate = `
  <TpkSelectCreatePrefab
    @label='Select or add your Ember Addon'
    @options={{this.options}}
    @changeset={{this.changeset}}
    @validationField='addon'
    @onCreate={{this.onCreate}}
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.selectCreate.title"}}
      @description={{t "emberInputValidation.prefabs.selectCreate.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.selectCreate.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t
            "emberInputValidation.prefabs.selectCreate.examples.basic"
          }}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicSelectCreateExample />
              <DisabledSelectCreateExample />
              <ErrorSelectCreateExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.selectCreate}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
