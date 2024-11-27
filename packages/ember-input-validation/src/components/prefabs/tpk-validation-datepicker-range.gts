import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import TpkValidationDatepickerComponent, { type TpkValidationDatepickerComponentSignature } from "../tpk-validation-datepicker.gts";
import { type BaseValidationSignature } from "../base.ts";
import { tracked } from "@glimmer/tracking";
import MandatoryLabelComponent from './mandatory-label.gts';
import Component from '@glimmer/component';

export interface TpkValidationDatepickerRangePrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationDatepickerComponentSignature['Args'], 'value' | 'promptTimeOnDateChange' | 'useCurrent' | 'noCalendar' | 'enableTime' | 'stepping' | 'enableSecond' | 'disabledTimeIntervals' | 'disabledHours' | 'enabledHours'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;

}

export default class TpkValidationDatepickerRangePrefabComponent extends Component<TpkValidationDatepickerRangePrefabSignature> {
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

      @mandatory={{@mandatory}}
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
      @requiredFields={{@requiredFields}}
      @mode="range"
      anchorScrollUp={{@validationField}}
      ...attributes
    as |V|>
      <V.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{V.mandatory}} />
      </V.Label>
      <V.Input />
      <TpkValidationErrorsComponent
        @errors={{V.errors}}

      />
    </TpkValidationDatepickerComponent>
  </template>
}
