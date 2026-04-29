import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t } from 'ember-intl';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import TpkLoginExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-login.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface TpkLoginPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

const loginCode = `
<TpkLogin
  @loginSchema={{this.loginSchema}}
  @onSubmit={{this.onSubmit}}
/>
`;

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkLoginPrefabDocs extends Component<TpkLoginPrefabDocsSignature> {
  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.tpk-login.title"}}
      @description={{t "ember-ui.prefabs.tpk-login.description"}}
    >
      <DocSection @title={{t "ember-ui.prefabs.tpk-login.examples.title"}}>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.tpk-login.examples.basic"}}
        >
          <:demo>
            <TpkLoginExample />
          </:demo>
          <:template>
            <CodeBlock @code={{loginCode}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
