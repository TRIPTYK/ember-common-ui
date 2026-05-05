import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t } from 'ember-intl';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import TpkSidebarExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-sidebar.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface TpkSidebarPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

const sidebarCode = `
<TpkSidebar
  @sidebarItems={{this.sidebarItems}}
  @collapsed={{this.collapsed}}
  @onCollapsedChange={{this.onCollapsedChange}}
/>
`;

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkSidebarPrefabDocs extends Component<TpkSidebarPrefabDocsSignature> {
  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.tpk-sidebar.title"}}
      @description={{t "ember-ui.prefabs.tpk-sidebar.description"}}
    >
      <DocSection @title={{t "ember-ui.prefabs.tpk-sidebar.examples.title"}}>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.tpk-sidebar.examples.basic"}}
        >
          <:demo>
            <TpkSidebarExample />
          </:demo>
          <:template>
            <CodeBlock @code={{sidebarCode}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
