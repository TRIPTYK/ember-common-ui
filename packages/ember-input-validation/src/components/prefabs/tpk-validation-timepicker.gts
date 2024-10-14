import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import TpkValidationDatepickerComponent, { type TpkValidationDatepickerComponentSignature } from "../tpk-validation-datepicker.gts";
import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import { tracked } from "@glimmer/tracking";
import MandatoryLabelComponent from './mandatory-label.gts';

export interface TpkValidationTimepickerPrefabSignature
  extends BaseValidationSignature {
  Args: Omit<TpkValidationDatepickerComponentSignature['Args'], 'mask' | 'noCalendar' | 'enableTime' | 'mode' | 'multipleDatesSeparator' | 'promptTimeOnDateChange' | 'useCurrent' | 'todayButton' | 'closeButton' | 'keepOpen' | 'minDate' | 'maxDate' | 'daysOfWeekDisabled' | 'disabledDates' | 'viewMode'>;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;

}

export default class TpkValidationTimepickerPrefabComponent extends BaseValidationComponent<TpkValidationTimepickerPrefabSignature> {
  @tracked mask = 'H:M';
  @tracked dateFormat = 'HH:mm';

  constructor(owner: unknown, args: TpkValidationTimepickerPrefabSignature['Args']) {
    super(owner, args);
    if (args.enableSecond) {
      this.mask = 'H:M:S';
      this.dateFormat = 'HH:mm:ss';
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
      @enableSecond={{@enableSecond}}
      @stepping={{@stepping}}
      @placeholder={{@placeholder}}
      @clearButton={{@clearButton}}
      @locale={{@locale}}
      @enableTime={{true}}
      @noCalendar={{true}}
      @mask={{this.mask}}
      @dateFormat={{this.dateFormat}}
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
