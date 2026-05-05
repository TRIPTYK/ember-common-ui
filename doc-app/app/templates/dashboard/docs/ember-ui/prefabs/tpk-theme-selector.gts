import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t } from 'ember-intl';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import TpkThemeSelectorExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-theme-selector.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface TpkThemeSelectorPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

const themeSelectorCode = `
<TpkThemeSelector
  @themes={{this.themes}}
  @localStorageKey="my-app-theme"
/>
`;

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkThemeSelectorPrefabDocs extends Component<TpkThemeSelectorPrefabDocsSignature> {
  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.tpk-theme-selector.title"}}
      @description={{t "ember-ui.prefabs.tpk-theme-selector.description"}}
    >
      <DocSection
        @title={{t "ember-ui.prefabs.tpk-theme-selector.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.tpk-theme-selector.examples.basic"}}
        >
          <:demo>
            <TpkThemeSelectorExample />
          </:demo>
          <:template>
            <CodeBlock @code={{themeSelectorCode}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
