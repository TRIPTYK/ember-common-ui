import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicEmailExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-email.gts';
import DisabledEmailExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-email.gts';
import ErrorEmailExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-email.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface EmailPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class EmailPrefabDocs extends Component<EmailPrefabDocsSignature> {
  @service declare intl: IntlService;

  email = `
  <TpkEmailPrefab
    @label='Email'
    @placeholder='Enter your email'
    @changeset={{this.changeset}}
    @validationField='email'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.email.title"}}
      @description={{t "emberInputValidation.prefabs.email.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.email.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.email.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicEmailExample />
              <DisabledEmailExample />
              <ErrorEmailExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.email}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
