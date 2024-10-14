import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import TpkValidationDatepickerComponent, { type TpkValidationDatepickerComponentSignature } from "../tpk-validation-datepicker.gts";
import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import { tracked } from "@glimmer/tracking";
import MandatoryLabelComponent from './mandatory-label.gts';

export interface TpkValidationDatepickerRangePrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationDatepickerComponentSignature['Args'], 'mask' | 'promptTimeOnDateChange' | 'useCurrent' | 'noCalendar' | 'enableTime' | 'stepping' | 'enableSecond' | 'disabledTimeIntervals' | 'disabledHours' | 'enabledHours'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;

}

export default class TpkValidationDatepickerRangePrefabComponent extends BaseValidationComponent<TpkValidationDatepickerRangePrefabSignature> {
  @tracked multipleDatesSeparator = ' - ';

  constructor(owner: unknown, args: TpkValidationDatepickerRangePrefabSignature['Args']) {
    super(owner, args);
    if (args.multipleDatesSeparator) {
      this.multipleDatesSeparator = args.multipleDatesSeparator;
    }
  }

  <template>
    <TpkValidationDatepickerComponent
      @label={{@label}}
      @onChange={{@onChange}}
      @onClose={{@onClose}}
      @disabled={{@disabled}}
      @classless={{@classless}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @placeholder={{@placeholder}}
      @clearButton={{@clearButton}}
      @todayButton={{@todayButton}}
      @closeButton={{@closeButton}}
      @minDate={{@minDate}}
      @maxDate={{@maxDate}}
      @keepOpen={{@keepOpen}}
      @daysOfWeekDisabled={{@daysOfWeekDisabled}}
      @disabledDates={{@disabledDates}}
      @viewMode={{@viewMode}}
      @locale={{@locale}}
      @dateFormat={{@dateFormat}}
      @multipleDatesSeparator={{this.multipleDatesSeparator}}
      @mode="range"
      ...attributes
    as |V|>
      <V.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{this.mandatory}} />
      </V.Label>
      <V.Input />
      <TpkValidationErrorsComponent
        @errors={{this.errors}}
        @classless={{@classless}}
      />
    </TpkValidationDatepickerComponent>
  </template>
}
