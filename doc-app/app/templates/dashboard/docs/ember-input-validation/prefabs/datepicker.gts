import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicDatepickerExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-datepicker.gts';
import DisabledDatepickerExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-datepicker.gts';
import ErrorDatepickerExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-datepicker.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface DatepickerPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class DatepickerPrefabDocs extends Component<DatepickerPrefabDocsSignature> {
  @service declare intl: IntlService;

  datepicker = `
  <TpkDatepickerPrefab
    @label='Datepicker'
    @changeset={{this.changeset}}
    @validationField='birthday'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.datepicker.title"}}
      @description={{t "emberInputValidation.prefabs.datepicker.description"}}
    >
      <DocSection
        @title={{t "emberInputValidation.prefabs.datepicker.examples.title"}}
      >
        <CodeExampleComponent
          @title={{t "emberInputValidation.prefabs.datepicker.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicDatepickerExample />
              <DisabledDatepickerExample />
              <ErrorDatepickerExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.datepicker}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
