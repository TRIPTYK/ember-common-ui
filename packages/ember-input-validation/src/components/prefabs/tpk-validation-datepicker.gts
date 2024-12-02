import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import TpkValidationDatepickerComponent, {
  type TpkValidationDatepickerComponentSignature,
} from '../tpk-validation-datepicker.gts';
import { type BaseValidationSignature } from '../base.ts';
import { tracked } from '@glimmer/tracking';
import MandatoryLabelComponent from './mandatory-label.gts';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export interface TpkValidationDatepickerRangePrefabSignature
  extends BaseValidationSignature {
  Args: Omit<
    TpkValidationDatepickerComponentSignature['Args'],
    'value' | 'useCurrent'
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
    assert(
      'If you want use range datepicker, please use TpkValidationDatepickerRangePrefab',
      args.mode !== 'range',
    );
    assert(
      'If you want use timepicker, please use TpkValidationTimepickerPrefab',
      args.noCalendar !== true,
    );
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
      @promptTimeOnDateChange={{@promptTimeOnDateChange}}
      @enableTime={{@enableTime}}
      @stepping={{@stepping}}
      @enableSecond={{@enableSecond}}
      @disabledTimeIntervals={{@disabledTimeIntervals}}
      @disabledHours={{@disabledHours}}
      @enabledHours={{@enabledHours}}
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
      @mode={{@mode}}
      anchorScrollUp={{@validationField}}
      ...attributes
      as |V|
    >
      <div
        class='tpk-datepicker-container'
        data-test-tpk-prefab-datepicker-container
        data-has-error='{{V.hasError}}'
      >
        <V.Label class='tpk-datepicker-label-container'>
          <MandatoryLabelComponent
            class='tpk-label'
            @label={{@label}}
            @mandatory={{V.mandatory}}
          />
        </V.Label>
        <V.Input class='tpk-datepicker-input' data-test-tpk-datepicker-input />
        <TpkValidationErrorsComponent
          class='tpk-validation-errors'
          @errors={{V.errors}}
        />
      </div>
    </TpkValidationDatepickerComponent>
  </template>
}
