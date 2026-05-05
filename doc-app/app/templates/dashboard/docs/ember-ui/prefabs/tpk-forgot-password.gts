import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t } from 'ember-intl';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import TpkForgotPasswordExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-forgot-password.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface TpkForgotPasswordPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

const forgotPasswordCode = `
<TpkForgotPassword
  @forgotPasswordSchema={{this.forgotPasswordSchema}}
  @onSubmit={{this.onSubmit}}
/>
`;

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TpkForgotPasswordPrefabDocs extends Component<TpkForgotPasswordPrefabDocsSignature> {
  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.tpk-forgot-password.title"}}
      @description={{t "ember-ui.prefabs.tpk-forgot-password.description"}}
    >
      <DocSection
        @title={{t "ember-ui.prefabs.tpk-forgot-password.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.tpk-forgot-password.examples.basic"}}
        >
          <:demo>
            <TpkForgotPasswordExample />
          </:demo>
          <:template>
            <CodeBlock @code={{forgotPasswordCode}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
