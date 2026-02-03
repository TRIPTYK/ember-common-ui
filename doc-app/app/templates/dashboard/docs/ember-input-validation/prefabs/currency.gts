import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicCurrencyExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-currency.gts';
import DisabledCurrencyExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-currency.gts';
import ErrorCurrencyExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-currency.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface CurrencyPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class CurrencyPrefabDocs extends Component<CurrencyPrefabDocsSignature> {
  @service declare intl: IntlService;

  currency = `
  <TpkCurrencyPrefab
    @label='Amount'
    @changeset={{this.changeset}}
    @validationField='value'
    @placeholder='Enter an amount'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.currency.title"}}
      @description={{t "emberInputValidation.prefabs.currency.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.currency.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.currency.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicCurrencyExample />
              <DisabledCurrencyExample />
              <ErrorCurrencyExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.currency}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
