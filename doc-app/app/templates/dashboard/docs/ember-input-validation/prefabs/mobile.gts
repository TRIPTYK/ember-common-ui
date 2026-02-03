import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicMobileExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-mobile.gts';
import DisabledMobileExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-mobile.gts';
import ErrorMobileExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-mobile.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';

interface Property {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface MobilePrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class MobilePrefabDocs extends Component<MobilePrefabDocsSignature> {
  @service declare intl: IntlService;

  mobile = `
  <TpkMobilePrefab
    @label='Mobile Number'
    @changeset={{this.changeset}}
    @validationField='phone'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.mobile.title"}}
      @description={{t "emberInputValidation.prefabs.mobile.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.mobile.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.mobile.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicMobileExample />
              <DisabledMobileExample />
              <ErrorMobileExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.mobile}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
