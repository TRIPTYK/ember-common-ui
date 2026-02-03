import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicSelectExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-select.gts';
import DisabledSelectExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-select.gts';
import ErrorSelectExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-select.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface SelectPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class SelectPrefabDocs extends Component<SelectPrefabDocsSignature> {
  @service declare intl: IntlService;

  select = `
  <TpkSelectPrefab
    @label='Select your Ember Addon'
    @options={{this.options}}
    @changeset={{this.changeset}}
    @validationField='addon'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.select.title"}}
      @description={{t "emberInputValidation.prefabs.select.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.select.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.select.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicSelectExample />
              <DisabledSelectExample />
              <ErrorSelectExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.select}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
