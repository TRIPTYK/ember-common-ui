import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import TpkValidationDatepickerComponent, {
  type TpkValidationDatepickerComponentSignature,
} from '../tpk-validation-datepicker.gts';
import { type BaseValidationSignature } from '../base.ts';
import { tracked } from '@glimmer/tracking';
import MandatoryLabelComponent from './mandatory-label.gts';
import Component from '@glimmer/component';

export interface TpkValidationDatepickerRangePrefabSignature
  extends BaseValidationSignature {
  Args: Omit<
    TpkValidationDatepickerComponentSignature['Args'],
    | 'value'
    | 'promptTimeOnDateChange'
    | 'useCurrent'
    | 'noCalendar'
    | 'enableTime'
    | 'stepping'
    | 'enableSecond'
    | 'disabledTimeIntervals'
    | 'disabledHours'
    | 'enabledHours'
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationDatepickerRangePrefabComponent extends Component<TpkValidationDatepickerRangePrefabSignature> {
  @tracked multipleDatesSeparator = ' - ';

  constructor(
    owner: unknown,
    args: TpkValidationDatepickerRangePrefabSignature['Args'],
  ) {
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
      @mode='range'
      anchorScrollUp={{@validationField}}
      as |V|
    >
      <div
        class='tpk-datepicker-range-container'
        data-test-tpk-prefab-datepicker-range-container
        data-has-error='{{V.hasError}}'
        ...attributes
      >
        <V.Label class='tpk-datepicker-range-label-container'>
          <MandatoryLabelComponent
            class='tpk-label'
            @label={{@label}}
            @mandatory={{V.mandatory}}
          />
        </V.Label>
        <V.Input
          class='tpk-datepicker-range-input'
          data-test-tpk-datepicker-range-input
        />
        <TpkValidationErrorsComponent
          class='tpk-validation-errors'
          @errors={{V.errors}}
        />
      </div>
    </TpkValidationDatepickerComponent>
  </template>
}
