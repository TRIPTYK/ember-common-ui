import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import DisabledToggleExample from 'doc-app/components/docs/ember-input/prefabs/disabled-toggle.gts';
import ToggleExample from 'doc-app/components/docs/ember-input/prefabs/toggle.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface TogglePrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class TogglePrefabDocs extends Component<TogglePrefabDocsSignature> {
  @service declare intl: IntlService;

  toggle = `
    <TpkTogglePrefab @checked={{true}} @label="Toggle Input" />
  `;

  <template>
    <DocPage
      @title={{t "emberInput.prefabs.toggle.title"}}
      @description={{t "emberInput.prefabs.toggle.description"}}
    >
      <DocSection @title={{t "emberInput.prefabs.toggle.examples.title"}}>
        <CodeExampleComponent
          @title={{t "emberInput.prefabs.toggle.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <ToggleExample />
              <DisabledToggleExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.toggle}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
