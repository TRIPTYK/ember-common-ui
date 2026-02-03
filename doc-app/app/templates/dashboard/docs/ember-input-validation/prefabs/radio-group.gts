import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicRadioGroupExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-radio-group.gts';
import DisabledRadioGroupExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-radio-group.gts';
import ErrorRadioGroupExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-radio-group.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface RadioGroupPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class RadioGroupPrefabDocs extends Component<RadioGroupPrefabDocsSignature> {
  @service declare intl: IntlService;

  radioGroup = `
  <TpkRadioGroupPrefab
    @groupLabel='Select an option'
    @changeset={{this.changeset}}
    @validationField='radio'
    as |Radio|
  >
    <Radio @value='applati' @label='Applati' @selected='applati' />
    <Radio @value='creux' @label='Creux' />
  </TpkRadioGroupPrefab>
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.radioGroup.title"}}
      @description={{t "emberInputValidation.prefabs.radioGroup.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.radioGroup.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.radioGroup.examples.basic"}}
        >
          <:demo>
            <div class="flex w-2/3 justify-between">
              <BasicRadioGroupExample />
              <DisabledRadioGroupExample />
              <ErrorRadioGroupExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.radioGroup}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
