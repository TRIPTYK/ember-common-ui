import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicInputExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-input.gts';
import DisabledInputExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-input.gts';
import ErrorInputExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-input.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface InputPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class InputPrefabDocs extends Component<InputPrefabDocsSignature> {
  @service declare intl: IntlService;
  input = `
  <TpkInputPrefab
    @label='Input'
    @changeset={{this.changeset}}
    @validationField='something'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.input.title"}}
      @description={{t "emberInputValidation.prefabs.input.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.input.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.input.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicInputExample />
              <DisabledInputExample />
              <ErrorInputExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.input}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
