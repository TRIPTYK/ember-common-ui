import { action } from '@ember/object';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from './base.ts';
import { assert } from '@ember/debug';
import { type TpkDatepickerInputArgs } from '@triptyk/ember-input/components/tpk-datepicker-input';
import { hash } from '@ember/helper';
import TpkDatepicker, {
  type TpkDatepickerSignature,
} from '@triptyk/ember-input/components/tpk-datepicker';

export interface TpkValidationDatepickerComponentSignature
  extends BaseValidationSignature {
  Args: Omit<
    BaseValidationSignature['Args'] & {
      label: string;
      disabled?: boolean;
      mask?: string;
      onChange?: (value: Date[]) => void;
    } & TpkDatepickerInputArgs,
    'value'
  >;
  Blocks: {
    default: [
      {
        Input: TpkDatepickerSignature['Blocks']['default'][0]['Input'];
        Label: TpkDatepickerSignature['Blocks']['default'][0]['Label'];
        errors: TpkValidationDatepickerComponent['errors'];
        hasError: TpkValidationDatepickerComponent['hasError'];
        firstError: TpkValidationDatepickerComponent['firstError'];
        mandatory: TpkValidationDatepickerComponent['mandatory'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationDatepickerComponent extends BaseValidationComponent<TpkValidationDatepickerComponentSignature> {
  @action onChange(dates: Date[]) {
    if (dates.length === 0)
      return this.args.changeset.set(
        this.args.validationField,
        this.args.mode === 'multiple' || this.args.mode === 'range' ? [] : null,
      );

    const date =
      this.args.mode === 'multiple' || this.args.mode === 'range'
        ? dates
        : dates[0];
    if (this.args.onChange) {
      return this.args.onChange(dates);
    }
    return this.args.changeset.set(this.args.validationField, date);
  }

  get value() {
    assert(
      `@value must be a string, date or null for @${this.args.validationField}`,
      typeof super.value === 'string' ||
        super.value instanceof Date ||
        super.value === null,
    );
    return super.value;
  }

  <template>
    <TpkDatepicker
      @value={{this.value}}
      @label={{@label}}
      @onChange={{this.onChange}}
      @onClose={{@onClose}}
      @disabled={{@disabled}}
      @placeholder={{@placeholder}}
      @mask={{@mask}}
      @useCurrent={{@useCurrent}}
      @mode={{@mode}}
      @multipleDatesSeparator={{@multipleDatesSeparator}}
      @stepping={{@stepping}}
      @promptTimeOnDateChange={{@promptTimeOnDateChange}}
      @todayButton={{@todayButton}}
      @clearButton={{@clearButton}}
      @closeButton={{@closeButton}}
      @enableTime={{@enableTime}}
      @noCalendar={{@noCalendar}}
      @enableSecond={{@enableSecond}}
      @keepOpen={{@keepOpen}}
      @locale={{@locale}}
      @dateFormat={{@dateFormat}}
      @minDate={{@minDate}}
      @maxDate={{@maxDate}}
      @daysOfWeekDisabled={{@daysOfWeekDisabled}}
      @disabledTimeIntervals={{@disabledTimeIntervals}}
      @disabledDates={{@disabledDates}}
      @enabledDates={{@enabledDates}}
      @disabledHours={{@disabledHours}}
      @enabledHours={{@enabledHours}}
      @viewMode={{@viewMode}}
      ...attributes
      data-has-error='{{this.hasError}}'
      as |D|
    >
      {{yield
        (hash
          Input=D.Input
          Label=D.Label
          errors=this.errors
          hasError=this.hasError
          firstError=this.firstError
          mandatory=this.mandatory
        )
      }}
    </TpkDatepicker>
  </template>
}
