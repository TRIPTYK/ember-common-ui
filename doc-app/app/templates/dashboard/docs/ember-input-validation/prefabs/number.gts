// doc-app/app/templates/dashboard/docs/ember-input-validation/prefabs/number.gts
import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import UnsignedNumberExample from 'doc-app/components/docs/ember-input-validation/prefabs/unsigned-number.gts';
import BasicNumberExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-number.gts';
import DisabledNumberExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-number.gts';
import ErrorNumberExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-number.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface NumberPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class NumberPrefabDocs extends Component<NumberPrefabDocsSignature> {
  @service declare intl: IntlService;

  unsignedNumberCode = `
  <TpkValidationNumber
    @label='Unsigned Number'
    @placeholder='Enter a number'
    @changeset={{this.changeset}}
    @validationField='uNumber'
    @unsigned={{true}}
  />
  `;

  basicNumberCode = `
  <TpkValidationNumber
    @label='Number'
    @placeholder='Enter a number'
    @changeset={{this.changeset}}
    @validationField='number'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.number.title"}}
      @description={{t "emberInputValidation.prefabs.number.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.number.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.number.examples.unsigned"}}
        >
          <:demo>
            <UnsignedNumberExample />
          </:demo>
          <:template>
            <CodeBlock @code={{this.unsignedNumberCode}} @language="gts" />
          </:template>
        </CodeExampleComponent>

        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.number.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicNumberExample />
              <DisabledNumberExample />
              <ErrorNumberExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.basicNumberCode}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
