import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicVatExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-vat.gts';
import DisabledVatExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-vat.gts';
import ErrorVatExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-vat.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface VatPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class VatPrefabDocs extends Component<VatPrefabDocsSignature> {
  @service declare intl: IntlService;

  vat = `
  <TpkVatPrefab
    @label='VAT'
    @placeholder='Enter vat'
    @changeset={{this.changeset}}
    @validationField='vat'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.vat.title"}}
      @description={{t "emberInputValidation.prefabs.vat.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.vat.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.vat.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicVatExample />
              <DisabledVatExample />
              <ErrorVatExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.vat}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
