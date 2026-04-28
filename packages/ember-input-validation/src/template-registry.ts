import TpkValidationRadioGroup from './components/tpk-validation-radio-group.gts';
import TpkValidationCheckbox from './components/tpk-validation-checkbox.gts';
import TpkValidationDatepicker from './components/tpk-validation-datepicker.gts';
import TpkValidationFile from './components/tpk-validation-file.gts';
import TpkValidationInput from './components/tpk-validation-input.gts';
import TpkValidationRadio from './components/tpk-validation-radio.gts';
import TpkValidationSelectComponent from './components/tpk-validation-select.gts';
import TpkValidationTextarea from './components/tpk-validation-textarea.gts';
import type TpkForm from './components/tpk-form.gts';

export default interface Registry {
  'tpk-validation-checkbox': typeof TpkValidationCheckbox;
  TpkValidationCheckbox: typeof TpkValidationCheckbox;
  'tpk-validation-datepicker': typeof TpkValidationDatepicker;
  TpkValidationDatepicker: typeof TpkValidationDatepicker;
  'tpk-validation-file': typeof TpkValidationFile;
  TpkValidationFile: typeof TpkValidationFile;
  'tpk-validation-input': typeof TpkValidationInput;
  TpkValidationInput: typeof TpkValidationInput;
  'tpk-validation-radio-group': typeof TpkValidationRadioGroup;
  TpkValidationRadioGroup: typeof TpkValidationRadioGroup;
  'tpk-validation-radio': typeof TpkValidationRadio;
  TpkValidationRadio: typeof TpkValidationRadio;
  'tpk-validation-select': typeof TpkValidationSelectComponent;
  TpkValidationSelect: typeof TpkValidationSelectComponent;
  'tpk-validation-textarea': typeof TpkValidationTextarea;
  TpkValidationTextarea: typeof TpkValidationTextarea;
  'tpk-form': typeof TpkForm;
}
