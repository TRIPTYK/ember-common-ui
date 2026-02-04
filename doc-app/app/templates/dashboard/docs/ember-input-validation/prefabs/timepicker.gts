import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicTimepickerExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-timepicker.gts';
import DisabledTimepickerExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-timepicker.gts';
import ErrorTimepickerExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-timepicker.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface TimepickerPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class TimepickerPrefabDocs extends Component<TimepickerPrefabDocsSignature> {
  @service declare intl: IntlService;

  timepicker = `
  <TpkTimepickerPrefab
    @label='Timepicker'
    @changeset={{this.changeset}}
    @validationField='time'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.timepicker.title"}}
      @description={{t "emberInputValidation.prefabs.timepicker.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.timepicker.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.timepicker.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicTimepickerExample />
              <DisabledTimepickerExample />
              <ErrorTimepickerExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.timepicker}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
