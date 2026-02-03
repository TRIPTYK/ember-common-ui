import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicIntegerExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-integer.gts';
import DisabledIntegerExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-integer.gts';
import ErrorIntegerExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-integer.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface IntegerPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class IntegerPrefabDocs extends Component<IntegerPrefabDocsSignature> {
  @service declare intl: IntlService;

  integer = `
  <TpkIntegerPrefab
    @label='Unsigned Integer'
    @placeholder='Enter a number'
    @changeset={{this.changeset}}
    @validationField='integer'
    @unsigned={{true}}
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.integer.title"}}
      @description={{t "emberInputValidation.prefabs.integer.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.integer.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.integer.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicIntegerExample />
              <DisabledIntegerExample />
              <ErrorIntegerExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.integer}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
