import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t } from 'ember-intl';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import TpkDashboardExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-dashboard.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface TpkDashboardPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

const dashboardCode = `
<TpkDashboard
  @title="My App"
  @sidebarItems={{this.sidebarItems}}
  @currentUser={{hash fullName="John Doe"}}
  @logoutLabel="Logout"
  @profileLabel="Profile"
>
  <:header>
    <div class="p-4 font-bold text-lg">My App</div>
  </:header>
  <:content>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-2">Welcome!</h1>
      <p class="text-gray-600">This is the main content area.</p>
    </div>
  </:content>
  <:footer>
    <div class="p-4 text-sm text-gray-400">© 2025 My App</div>
  </:footer>
</TpkDashboard>
`;

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkDashboardPrefabDocs extends Component<TpkDashboardPrefabDocsSignature> {
  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.tpk-dashboard.title"}}
      @description={{t "ember-ui.prefabs.tpk-dashboard.description"}}
    >
      <DocSection @title={{t "ember-ui.prefabs.tpk-dashboard.examples.title"}}>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.tpk-dashboard.examples.basic"}}
        >
          <:demo>
            <TpkDashboardExample />
          </:demo>
          <:template>
            <CodeBlock @code={{dashboardCode}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
