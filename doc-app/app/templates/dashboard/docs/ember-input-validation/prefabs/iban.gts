import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicIbanExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-iban.gts';
import DisabledIbanExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-iban.gts';
import ErrorIbanExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-iban.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface IbanPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class IbanPrefabDocs extends Component<IbanPrefabDocsSignature> {
  @service declare intl: IntlService;

  iban = `
  <TpkIbanPrefab
    @label='IBAN'
    @placeholder='Enter IBAN'
    @changeset={{this.changeset}}
    @validationField='iban'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.iban.title"}}
      @description={{t "emberInputValidation.prefabs.iban.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.iban.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.iban.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicIbanExample />
              <DisabledIbanExample />
              <ErrorIbanExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.iban}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
