// doc-app/app/routes/docs/ember-input-validation/prefabs/datepicker.ts
import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsDatepickerRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.datepicker.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.datepicker.properties.changeset.description',
        },
        {
          name: '@multipleDatesSeparator',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.multipleDatesSeparator.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.label.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.onChange.description',
        },
        {
          name: '@onClose',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.onClose.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.disabled.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.mandatory.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.placeholder.description',
        },
        {
          name: '@clearButton',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.clearButton.description',
        },
        {
          name: '@todayButton',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.todayButton.description',
        },
        {
          name: '@closeButton',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.closeButton.description',
        },
        {
          name: '@minDate',
          type: 'Date',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.minDate.description',
        },
        {
          name: '@maxDate',
          type: 'Date',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.maxDate.description',
        },
        {
          name: '@keepOpen',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.keepOpen.description',
        },
        {
          name: '@daysOfWeekDisabled',
          type: 'Array<number>',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.daysOfWeekDisabled.description',
        },
        {
          name: '@disabledDates',
          type: 'Array<Date>',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.disabledDates.description',
        },
        {
          name: '@viewMode',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.viewMode.description',
        },
        {
          name: '@locale',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.locale.description',
        },
        {
          name: '@dateFormat',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.dateFormat.description',
        },
        {
          name: '@promptTimeOnDateChange',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.promptTimeOnDateChange.description',
        },
        {
          name: '@noCalendar',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.noCalendar.description',
        },
        {
          name: '@enableTime',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.enableTime.description',
        },
        {
          name: '@stepping',
          type: 'number',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.stepping.description',
        },
        {
          name: '@enableSecond',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.enableSecond.description',
        },
        {
          name: '@disabledTimeIntervals',
          type: 'Array',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.disabledTimeIntervals.description',
        },
        {
          name: '@disabledHours',
          type: 'Array<number>',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.disabledHours.description',
        },
        {
          name: '@enabledHours',
          type: 'Array<number>',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker.properties.enabledHours.description',
        },
      ],
    };
  }
}
