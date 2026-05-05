import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t } from 'ember-intl';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import TpkNavbarExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-navbar.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface TpkNavbarPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

const navbarCode = `
<TpkNavbar
  @title="My App"
  @navbarItems={{this.navbarItems}}
  @currentUser={{this.currentUser}}
  @onLogout={{this.onLogout}}
/>
`;

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkNavbarPrefabDocs extends Component<TpkNavbarPrefabDocsSignature> {
  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.tpk-navbar.title"}}
      @description={{t "ember-ui.prefabs.tpk-navbar.description"}}
    >
      <DocSection @title={{t "ember-ui.prefabs.tpk-navbar.examples.title"}}>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.tpk-navbar.examples.basic"}}
        >
          <:demo>
            <TpkNavbarExample />
          </:demo>
          <:template>
            <CodeBlock @code={{navbarCode}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
