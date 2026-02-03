import Route from '@ember/routing/route';

export default class DocsEmberInputValidationPrefabsDatepickerRangeRoute extends Route {
  model() {
    return {
      properties: [
        {
          name: '@validationField',
          type: 'string',
          required: true,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.validationField.description',
        },
        {
          name: '@changeset',
          type: 'ImmerChangeset',
          required: true,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.changeset.description',
        },
        {
          name: '@multipleDatesSeparator',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.multipleDatesSeparator.description',
        },
        {
          name: '@label',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.label.description',
        },
        {
          name: '@onChange',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.onChange.description',
        },
        {
          name: '@onClose',
          type: 'function',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.onClose.description',
        },
        {
          name: '@disabled',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.disabled.description',
        },
        {
          name: '@mandatory',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.mandatory.description',
        },
        {
          name: '@placeholder',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.placeholder.description',
        },
        {
          name: '@clearButton',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.clearButton.description',
        },
        {
          name: '@todayButton',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.todayButton.description',
        },
        {
          name: '@closeButton',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.closeButton.description',
        },
        {
          name: '@minDate',
          type: 'Date',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.minDate.description',
        },
        {
          name: '@maxDate',
          type: 'Date',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.maxDate.description',
        },
        {
          name: '@keepOpen',
          type: 'boolean',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.keepOpen.description',
        },
        {
          name: '@daysOfWeekDisabled',
          type: 'number[]',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.daysOfWeekDisabled.description',
        },
        {
          name: '@disabledDates',
          type: 'Date[]',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.disabledDates.description',
        },
        {
          name: '@viewMode',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.viewMode.description',
        },
        {
          name: '@locale',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.locale.description',
        },
        {
          name: '@dateFormat',
          type: 'string',
          required: false,
          description:
            'ember-input-validation.prefabs.datepicker-range.properties.dateFormat.description',
        },
      ],
    };
  }
}
