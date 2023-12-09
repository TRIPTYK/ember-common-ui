import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import TpkValidationTextareaComponent from '../components/tpk-validation-textarea.gts';
import TpkValidationInputComponent from '../components/tpk-validation-input.gts';
import TpkValidationSelect from '../components/tpk-validation-select.gts';
import TpkValidationCheckboxComponent from '../components/tpk-validation-checkbox.gts';
import TpkValidationRadioComponent from '../components/tpk-validation-radio.gts';
import TpkValidationFileComponent from '../components/tpk-validation-file.gts';
import TpkValidationDatepickerComponent from '../components/tpk-validation-datepicker.gts';

export default class TpkFormService extends Service {
  @tracked TpkInput = TpkValidationInputComponent;
  @tracked TpkTextarea = TpkValidationTextareaComponent;
  @tracked TpkSelect = TpkValidationSelect;
  @tracked TpkCheckbox = TpkValidationCheckboxComponent;
  @tracked TpkRadio = TpkValidationRadioComponent;
  @tracked TpkFile = TpkValidationFileComponent;
  @tracked TpkDatePicker = TpkValidationDatepickerComponent;
}
