import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicFileListExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-file-list.gts';
import DisabledFileListExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-file-list.gts';
import ErrorFileListExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-file-list.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface FileListPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class FileListPrefabDocs extends Component<FileListPrefabDocsSignature> {
  @service declare intl: IntlService;

  fileList = `
  <TpkFileListPrefab
    @label='File'
    @placeholder='Drag and drop a file or click to select a file (max 10MB)'
    @changeset={{this.changeset}}
    @validationField='files'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.fileList.title"}}
      @description={{t "emberInputValidation.prefabs.fileList.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.fileList.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.fileList.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicFileListExample />
              <DisabledFileListExample />
              <ErrorFileListExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.fileList}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
