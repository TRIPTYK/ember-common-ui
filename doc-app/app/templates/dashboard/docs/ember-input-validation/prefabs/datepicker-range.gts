import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import BasicDatepickerRangeExample from 'doc-app/components/docs/ember-input-validation/prefabs/basic-datepicker-range.gts';
import DisabledDatepickerRangeExample from 'doc-app/components/docs/ember-input-validation/prefabs/disabled-datepicker-range.gts';
import ErrorDatepickerRangeExample from 'doc-app/components/docs/ember-input-validation/prefabs/error-datepicker-range.gts';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import type { Property } from 'doc-app/utils/table-property.interface';

interface DatepickerRangePrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class DatepickerRangePrefabDocs extends Component<DatepickerRangePrefabDocsSignature> {
  @service declare intl: IntlService;

  datepickerRange = `
  <TpkDatepickerRangePrefab
    @label='Datepicker Range'
    @changeset={{this.changeset}}
    @validationField='range'
  />
  `;

  <template>
    <DocPage
      @title={{t "emberInputValidation.prefabs.datepickerRange.title"}}
      @description={{t
        "emberInputValidation.prefabs.datepickerRange.description"
      }}
    >
      <DocSection
        @title={{t
          "emberInputValidation.prefabs.datepickerRange.examples.title"
        }}
      >
        <CodeExampleComponent
          @title={{t
            "emberInputValidation.prefabs.datepickerRange.examples.basic"
          }}
        >
          <:demo>
            <div class="flex gap-4">
              <BasicDatepickerRangeExample />
              <DisabledDatepickerRangeExample />
              <ErrorDatepickerRangeExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{this.datepickerRange}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>
      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
