import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicFileExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-file.gts';
import DisabledFileExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-file.gts';
import ErrorFileExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-file.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface FilePrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class FilePrefabDocs extends Component<FilePrefabDocsSignature> {
  @service declare intl: IntlService;

  file = `
  <TpkFilePrefab
    @label='File'
    @changeset={{this.changeset}}
    @validationField='file'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.file.title"}}
      @description={{t "emberInputValidation.prefabs.file.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.file.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.file.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicFileExample />
              <DisabledFileExample />
              <ErrorFileExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.file}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
