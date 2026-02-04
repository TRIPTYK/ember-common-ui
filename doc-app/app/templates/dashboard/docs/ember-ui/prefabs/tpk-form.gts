import Component from '@glimmer/component';
import DocPage from 'doc-app/components/doc/page';
import DocSection from 'doc-app/components/doc/section';
import DocPropertyTable from 'doc-app/components/doc/property-table';
import { t, type IntlService } from 'ember-intl';
import { service } from '@ember/service';
import CodeExampleComponent from 'doc-app/components/doc/code-example.gts';
import CodeBlock from 'doc-app/components/doc/code-block.gts';
import TpkFormExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-form.gts';
import TpkFormBaseComponentsExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-form/base-components.gts';
import TpkFormReactiveValidationExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-form/reactive-validation.gts';
import TpkFormSubmitOnlyValidationExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-form/submit-only-validation.gts';
import TpkFormErrorHandlingExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-form/error-handling.gts';
import TpkFormDisabledStateExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-form/disabled-state.gts';
import TpkFormRequiredFieldsExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-form/required-fields.gts';
import TpkFormChangesetGetExample from 'doc-app/components/docs/ember-ui/prefabs/tpk-form/changeset-get.gts';
import type { Property } from 'doc-app/utils/table-property.interface';
import {
  baseComponentsExample,
  changesetGetExample,
  disabledStateExample,
  errorHandlingExample,
  reactiveValidationExample,
  requiredFieldsExample,
  submitOnlyValidationExample,
  tpkForm,
} from './tpk-form-code-block';

interface TpkFormPrefabDocsSignature {
  Args: {
    model: {
      properties: Property[];
    };
  };
}

export default class TpkFormPrefabDocs extends Component<TpkFormPrefabDocsSignature> {
  @service declare intl: IntlService;

  baseComponents = [
    {
      code: 'F.TpkInput',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.baseComponents.items.input',
      htmlSafe: false,
    },
    {
      code: 'F.TpkTextarea',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.baseComponents.items.textarea',
      htmlSafe: false,
    },
    {
      code: 'F.TpkSelect',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.baseComponents.items.select',
      htmlSafe: false,
    },
    {
      code: 'F.TpkCheckbox',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.baseComponents.items.checkbox',
      htmlSafe: false,
    },
    {
      code: 'F.TpkRadio',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.baseComponents.items.radio',
      htmlSafe: false,
    },
    {
      code: 'F.TpkRadioGroup',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.baseComponents.items.radioGroup',
      htmlSafe: false,
    },
    {
      code: 'F.TpkFile',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.baseComponents.items.file',
      htmlSafe: false,
    },
    {
      code: 'F.TpkDatepicker',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.baseComponents.items.datepicker',
      htmlSafe: false,
    },
  ];

  prefabComponents = [
    {
      code: 'F.TpkInputPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.prefabComponents.items.input',
      htmlSafe: false,
    },
    {
      code: 'F.TpkTextareaPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.prefabComponents.items.textarea',
      htmlSafe: false,
    },
    {
      code: 'F.TpkSelectPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.prefabComponents.items.select',
      htmlSafe: false,
    },
    {
      code: 'F.TpkSelectCreatePrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.prefabComponents.items.selectCreate',
      htmlSafe: false,
    },
    {
      code: 'F.TpkSelectSearchPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.prefabComponents.items.selectSearch',
      htmlSafe: false,
    },
    {
      code: 'F.TpkCheckboxPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.prefabComponents.items.checkbox',
      htmlSafe: false,
    },
    {
      code: 'F.TpkRadioPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.prefabComponents.items.radio',
      htmlSafe: false,
    },
    {
      code: 'F.TpkRadioGroupPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.prefabComponents.items.radioGroup',
      htmlSafe: false,
    },
    {
      code: 'F.TpkFilePrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.prefabComponents.items.file',
      htmlSafe: false,
    },
  ];

  specializedInputs = [
    {
      code: 'F.TpkPasswordPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.items.password',
      htmlSafe: false,
    },
    {
      code: 'F.TpkEmailPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.items.email',
      htmlSafe: false,
    },
    {
      code: 'F.TpkMobilePrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.items.mobile',
      htmlSafe: false,
    },
    {
      code: 'F.TpkIbanPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.items.iban',
      htmlSafe: false,
    },
    {
      code: 'F.TpkBicPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.items.bic',
      htmlSafe: false,
    },
    {
      code: 'F.TpkVatPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.items.vat',
      htmlSafe: false,
    },
    {
      code: 'F.TpkNationalNumberPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.items.nationalNumber',
      htmlSafe: false,
    },
    {
      code: 'F.TpkCurrencyPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.items.currency',
      htmlSafe: false,
    },
    {
      code: 'F.TpkIntegerPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.items.integer',
      htmlSafe: false,
    },
    {
      code: 'F.TpkNumberPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.items.number',
      htmlSafe: false,
    },
  ];

  dateTimeComponents = [
    {
      code: 'F.TpkDatepickerPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.dateTime.items.datepicker',
      htmlSafe: false,
    },
    {
      code: 'F.TpkDatepickerRangePrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.dateTime.items.datepickerRange',
      htmlSafe: false,
    },
    {
      code: 'F.TpkTimepickerPrefab',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.dateTime.items.timepicker',
      htmlSafe: false,
    },
  ];

  helpers = [
    {
      code: 'F.changesetGet',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.helpers.items.changesetGet',
      htmlSafe: true,
    },
    {
      code: 'F.requiredFields',
      translate:
        'ember-ui.prefabs.tpk-form.sections.yieldedComponents.helpers.items.requiredFields',
      htmlSafe: false,
    },
  ];

  get componentSections() {
    return [
      {
        titleKey:
          'ember-ui.prefabs.tpk-form.sections.yieldedComponents.baseComponents.title',
        items: this.baseComponents,
      },
      {
        titleKey:
          'ember-ui.prefabs.tpk-form.sections.yieldedComponents.prefabComponents.title',
        items: this.prefabComponents,
      },
      {
        titleKey:
          'ember-ui.prefabs.tpk-form.sections.yieldedComponents.specializedInputs.title',
        items: this.specializedInputs,
      },
      {
        titleKey:
          'ember-ui.prefabs.tpk-form.sections.yieldedComponents.dateTime.title',
        items: this.dateTimeComponents,
      },
      {
        titleKey:
          'ember-ui.prefabs.tpk-form.sections.yieldedComponents.helpers.title',
        items: this.helpers,
      },
    ];
  }

  <template>
    <DocPage
      @title={{t "ember-ui.prefabs.tpk-form.title"}}
      @description={{t "ember-ui.prefabs.tpk-form.description"}}
    >
      <DocSection @title={{t "ember-ui.prefabs.tpk-form.examples.title"}}>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.tpk-form.examples.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <TpkFormExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{tpkForm}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>

      <DocSection
        @title={{t
          "ember-ui.prefabs.tpk-form.sections.yieldedComponents.title"
        }}
      >
        <p class="mb-4">{{t
            "ember-ui.prefabs.tpk-form.sections.yieldedComponents.description"
          }}</p>
        <div class="space-y-6">
          {{#each this.componentSections as |section|}}
            <div>
              <h4 class="text-lg font-semibold mb-2">{{t section.titleKey}}</h4>
              <ul class="list-disc list-inside space-y-1">
                {{#each section.items as |item|}}
                  <li><code>{{item.code}}</code>
                    -
                    {{t item.translate htmlSafe=item.htmlSafe}}
                  </li>
                {{/each}}
              </ul>
            </div>
          {{/each}}
        </div>
      </DocSection>

      <DocSection
        @title={{t
          "ember-ui.prefabs.tpk-form.sections.usingBaseComponents.title"
        }}
      >
        <p class="mb-3">{{t
            "ember-ui.prefabs.tpk-form.sections.usingBaseComponents.description"
          }}</p>
        <CodeExampleComponent
          @title={{t
            "ember-ui.prefabs.tpk-form.sections.usingBaseComponents.basic"
          }}
        >
          <:demo>
            <div class="flex gap-4">
              <TpkFormBaseComponentsExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{baseComponentsExample}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>

      <DocSection
        @title={{t
          "ember-ui.prefabs.tpk-form.sections.validationBehavior.title"
        }}
      >
        <div class="space-y-6">
          <div>
            <h4 class="text-lg font-semibold mb-2">{{t
                "ember-ui.prefabs.tpk-form.sections.validationBehavior.reactive.title"
              }}</h4>
            <p class="mb-3">{{t
                "ember-ui.prefabs.tpk-form.sections.validationBehavior.reactive.description"
              }}</p>
            <CodeExampleComponent
              @title={{t
                "ember-ui.prefabs.tpk-form.sections.validationBehavior.reactive.basic"
              }}
            >
              <:demo>
                <div class="flex gap-4">
                  <TpkFormReactiveValidationExample />
                </div>
              </:demo>
              <:template>
                <CodeBlock
                  @code={{reactiveValidationExample}}
                  @language="gts"
                />
              </:template>
            </CodeExampleComponent>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-2">{{t
                "ember-ui.prefabs.tpk-form.sections.validationBehavior.submitOnly.title"
              }}</h4>
            <p class="mb-3">{{t
                "ember-ui.prefabs.tpk-form.sections.validationBehavior.submitOnly.description"
              }}</p>
            <CodeExampleComponent
              @title={{t
                "ember-ui.prefabs.tpk-form.sections.validationBehavior.submitOnly.basic"
              }}
            >
              <:demo>
                <div class="flex gap-4">
                  <TpkFormSubmitOnlyValidationExample />
                </div>
              </:demo>
              <:template>
                <CodeBlock
                  @code={{submitOnlyValidationExample}}
                  @language="gts"
                />
              </:template>
            </CodeExampleComponent>
          </div>
        </div>
      </DocSection>

      <DocSection
        @title={{t "ember-ui.prefabs.tpk-form.sections.errorHandling.title"}}
      >
        <p class="mb-3">{{t
            "ember-ui.prefabs.tpk-form.sections.errorHandling.description"
          }}</p>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.tpk-form.sections.errorHandling.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <TpkFormErrorHandlingExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{errorHandlingExample}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>

      <DocSection
        @title={{t "ember-ui.prefabs.tpk-form.sections.disabledState.title"}}
      >
        <p class="mb-3">{{t
            "ember-ui.prefabs.tpk-form.sections.disabledState.description"
          }}</p>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.tpk-form.sections.disabledState.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <TpkFormDisabledStateExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{disabledStateExample}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>

      <DocSection
        @title={{t "ember-ui.prefabs.tpk-form.sections.requiredFields.title"}}
      >
        <p class="mb-3">{{t
            "ember-ui.prefabs.tpk-form.sections.requiredFields.description"
          }}</p>
        <CodeExampleComponent
          @title={{t "ember-ui.prefabs.tpk-form.sections.requiredFields.basic"}}
        >
          <:demo>
            <div class="flex gap-4">
              <TpkFormRequiredFieldsExample />
            </div>
          </:demo>
          <:template>
            <CodeBlock @code={{requiredFieldsExample}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>

      <DocSection
        @title={{t
          "ember-ui.prefabs.tpk-form.sections.changesetGetHelper.title"
        }}
      >
        <p class="mb-3">{{t
            "ember-ui.prefabs.tpk-form.sections.changesetGetHelper.description"
          }}</p>
        <CodeExampleComponent
          @title={{t
            "ember-ui.prefabs.tpk-form.sections.changesetGetHelper.basic"
          }}
        >
          <:demo>
            <TpkFormChangesetGetExample />
          </:demo>
          <:template>
            <CodeBlock @code={{changesetGetExample}} @language="gts" />
          </:template>
        </CodeExampleComponent>
      </DocSection>

      <DocSection @title={{t "docs.sections.properties"}}>
        <DocPropertyTable @properties={{@model.properties}} />
      </DocSection>
    </DocPage>
  </template>
}
