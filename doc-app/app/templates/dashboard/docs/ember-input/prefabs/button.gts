import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import ButtonExample from 'doc-app/components/docs/ember-input/prefabs/button.gts';
import DisabledButtonExample from 'doc-app/components/docs/ember-input/prefabs/disabled-button.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface ButtonPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class ButtonPrefabDocs extends Component<ButtonPrefabDocsSignature> {
  @service declare intl: IntlService;

  button = `
    <TpkPrefabButton
      @onClick={{this.incrementCounter}}
      @label="Button Enabled"
    />
  `;

  <template>
    <DocPage
      @title={{t "emberInput.prefabs.button.title"}}
      @description={{t "emberInput.prefabs.button.description"}}
    >
      <DocSection @title={{t "emberInput.prefabs.button.examples.title"}}>
        <CodeExampleComponent
          @title={{t "emberInput.prefabs.button.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <ButtonExample />
              <DisabledButtonExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.button}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
