import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t } from 'ember-intl';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import BasicCheckboxExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-checkbox.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface CheckboxPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

const checkboxCode = `
<TpkValidationCheckbox
  @label="I accept the terms and conditions"
  @changeset={{this.changeset}}
  @validationField="accepted"
/>
`;

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class CheckboxPrefabDocs extends Component<CheckboxPrefabDocsSignature> {
  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.checkbox.title"}}
      @description={{t "emberInputValidation.prefabs.checkbox.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.checkbox.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.checkbox.examples.basic"}}
        >
          <:demo>
            <BasicCheckboxExample />
          </:demo>
          <:template>
            <CodeBlock @code={{checkboxCode}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
