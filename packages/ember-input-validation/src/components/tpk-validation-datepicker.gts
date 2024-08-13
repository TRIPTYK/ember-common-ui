import { action } from '@ember/object';
import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from './base.ts';
import { assert } from '@ember/debug';
import { type FlatpickerArgs } from '@triptyk/ember-input/components/tpk-datepicker/input';
import { hash } from '@ember/helper';
import TpkDatepicker, {
  type TpkDatepickerSignature,
} from '@triptyk/ember-input/components/tpk-datepicker';

export interface TpkValidationDatepickerComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & {
    label: string;
    classless?: boolean;
    disabled?: boolean;
    changeEvent?: 'input' | 'change';
    mask?: string;
  } & FlatpickerArgs;
  Blocks: {
    default: [
      {
        Input: TpkDatepickerSignature['Blocks']['default'][0]['Input'];
        Label: TpkDatepickerSignature['Blocks']['default'][0]['Label'];
        errors: TpkValidationDatepickerComponent['errors'];
        hasError: TpkValidationDatepickerComponent['hasError'];
        firstError: TpkValidationDatepickerComponent['firstError'];
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
      return this.args.onChange(date);
    }
    return this.args.changeset.set(this.args.validationField, date);
  }

  get value() {
    assert(
      `@value must be a string, number, date or null for @${this.args.validationField}`,
      typeof super.value === 'string' ||
        typeof super.value === 'number' ||
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
      @altFormat={{@altFormat}}
      @altInput={{@altInput}}
      @altInputClass={{@altInputClass}}
      @allowInput={{@allowInput}}
      @allowInvalidPreload={{@allowInvalidPreload}}
      @appendTo={{@appendTo}}
      @ariaDateFormat={{@ariaDateFormat}}
      @conjunction={{@conjunction}}
      @clickOpens={{@clickOpens}}
      @dateFormat={{@dateFormat}}
      @defaultDate={{@defaultDate}}
      @defaultHour={{@defaultHour}}
      @defaultMinute={{@defaultMinute}}
      @disabledDates={{@disabledDates}}
      @disableMobile={{@disableMobile}}
      @enable={{@enable}}
      @enableTime={{@enableTime}}
      @classless={{@classless}}
      @enableSeconds={{@enableSeconds}}
      @formatDate={{@formatDate}}
      @hourIncrement={{@hourIncrement}}
      @inline={{@inline}}
      @maxDate={{@maxDate}}
      @minDate={{@minDate}}
      @locale={{@locale}}
      @minuteIncrement={{@minuteIncrement}}
      @nextArrow={{@nextArrow}}
      @noCalendar={{@noCalendar}}
      @onOpen={{@onOpen}}
      @onReady={{@onReady}}
      @parseDate={{@parseDate}}
      @position={{@position}}
      @positionElement={{@positionElement}}
      @prevArrow={{@prevArrow}}
      @shorthandCurrentMonth={{@shorthandCurrentMonth}}
      @showMonths={{@showMonths}}
      @time_24hr={{@time_24hr}}
      @weekNumbers={{@weekNumbers}}
      @wrap={{@wrap}}
      @monthSelectorType={{@monthSelectorType}}
      @mode={{@mode}}
      @mask={{@mask}}
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
        )
      }}
    </TpkDatepicker>
  </template>
}
