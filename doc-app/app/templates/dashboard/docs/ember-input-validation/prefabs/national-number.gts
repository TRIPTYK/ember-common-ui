import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicNationalNumberExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-national-number.gts';
import DisabledNationalNumberExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-national-number.gts';
import ErrorNationalNumberExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-national-number.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface NationalNumberPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class NationalNumberPrefabDocs extends Component<NationalNumberPrefabDocsSignature> {
  @service declare intl: IntlService;

  nationalNumber = `
  <TpkNationalNumberPrefab
    @label='National number'
    @placeholder='Enter belgian national number'
    @changeset={{this.changeset}}
    @validationField='nationalNumber'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.nationalNumber.title"}}
      @description={{t
        "emberInputValidation.prefabs.nationalNumber.description"
      }}
    >
      <DocSection
        @title={{t
          "emberInputValidation.prefabs.nationalNumber.examples.title"
        }}
      >
        <CodeExampleComponent
          @title={{t
            "emberInputValidation.prefabs.nationalNumber.examples.basic"
          }}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicNationalNumberExample />
              <DisabledNationalNumberExample />
              <ErrorNationalNumberExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.nationalNumber}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
