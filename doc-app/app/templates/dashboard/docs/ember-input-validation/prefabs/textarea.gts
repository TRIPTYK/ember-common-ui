import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicTextareaExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-textarea.gts';
import DisabledTextareaExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-textarea.gts';
import ErrorTextareaExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-textarea.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface TextareaPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class TextareaPrefabDocs extends Component<TextareaPrefabDocsSignature> {
  @service declare intl: IntlService;

  textarea = `
  <TpkTextareaPrefab
    @label='Explain why you like Ember'
    @maxLength={{100}}
    @changeset={{this.changeset}}
    @validationField='ember'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.textarea.title"}}
      @description={{t "emberInputValidation.prefabs.textarea.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.textarea.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.textarea.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicTextareaExample />
              <DisabledTextareaExample />
              <ErrorTextareaExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.textarea}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
