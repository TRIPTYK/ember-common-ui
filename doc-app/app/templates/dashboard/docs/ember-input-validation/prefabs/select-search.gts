import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicSelectSearchExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-select-search.gts';
import DisabledSelectSearchExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-select-search.gts';
import ErrorSelectSearchExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-select-search.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface SelectSearchPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class SelectSearchPrefabDocs extends Component<SelectSearchPrefabDocsSignature> {
  @service declare intl: IntlService;

  selectSearch = `
  <TpkSelectSearchPrefab
    @label='Try to find out the best repository on Github'
    @options={{this.options}}
    @onSearch={{perform this.onSearch}}
    @changeset={{this.changeset}}
    @validationField='repository'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.selectSearch.title"}}
      @description={{t "emberInputValidation.prefabs.selectSearch.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.selectSearch.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t
            "emberInputValidation.prefabs.selectSearch.examples.basic"
          }}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicSelectSearchExample />
              <DisabledSelectSearchExample />
              <ErrorSelectSearchExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.selectSearch}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
