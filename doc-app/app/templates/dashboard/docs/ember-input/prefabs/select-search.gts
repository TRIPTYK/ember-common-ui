import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicSelectSearchExample from 'doc-app/components/docs/ember-input/prefabs/basic-select-search.gts';
import DisabledSelectSearchExample from 'doc-app/components/docs/ember-input/prefabs/disabled-select-search.gts';
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
  <div class="tpk-select-search-container">
    <TpkSelectCreate
      @options={{this.searchOptions}}
      @selected={{this.selection}}
      @onChange={{this.onChange}}
      @onCreate={{this.onCreate}}
      @search={{this.search}}
      @searchEnabled={{true}}
      @label="Search for a fruit:"
      as |S|
    >
      <S.Option as |opt|>
        {{opt.option}}
      </S.Option>
    </TpkSelectCreate>
  </div>
  `;

  <template>
    <DocPage
      @title={{t "emberInput.prefabs.selectSearch.title"}}
      @description={{t "emberInput.prefabs.selectSearch.description"}}
    >
      <DocSection @title={{t "emberInput.prefabs.selectSearch.examples.title"}}>
        <CodeExampleComponent
          @title={{t "emberInput.prefabs.selectSearch.examples.basic"}}
        >
          <:demo>
            <div class="w-full gap-4">
              <BasicSelectSearchExample />
              <DisabledSelectSearchExample />
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
