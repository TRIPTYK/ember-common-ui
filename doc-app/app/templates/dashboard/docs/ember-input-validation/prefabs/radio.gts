import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicRadioExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-radio.gts';
import DisabledRadioExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-radio.gts';
import ErrorRadioExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-radio.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface RadioPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class RadioPrefabDocs extends Component<RadioPrefabDocsSignature> {
  @service declare intl: IntlService;

  radio = `
  <TpkRadioPrefab
    @changeset={{this.changeset}}
    @validationField='radio'
    @label='This'
    @value='selected one'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.radio.title"}}
      @description={{t "emberInputValidation.prefabs.radio.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.radio.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.radio.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicRadioExample />
              <DisabledRadioExample />
              <ErrorRadioExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.radio}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
