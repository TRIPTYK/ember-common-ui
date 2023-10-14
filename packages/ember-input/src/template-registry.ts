import type TpkButtonComponent from './components/tpk-button';
import type TpkCheckboxComponent from './components/tpk-checkbox';
import type TpkCheckboxInputComponent from './components/tpk-checkbox/input';
import type TpkCheckboxLabelComponent from './components/tpk-checkbox/label';
import type TpkDatepicker from './components/tpk-datepicker';
import type TpkDatepickerInputComponent from './components/tpk-datepicker/input';
import type TpkDatepickerLabelComponent from './components/tpk-datepicker/label';
import type TpkFileComponent from './components/tpk-file';
import type TpkFileInputComponent from './components/tpk-file/input';
import type TpkFileLabelComponent from './components/tpk-file/label';
import type TpkInputComponent from './components/tpk-input';
import type TpkInputInputComponent from './components/tpk-input/input';
import type TpkRadioComponent from './components/tpk-radio';
import type TpkRadioInputComponent from './components/tpk-radio/input';
import type TpkRadioLabelComponent from './components/tpk-radio/label';
import type TpkSelectComponent from './components/tpk-select';
import type TpkSelectSearchComponent from './components/tpk-select-search';
import type TpkSelectSearchButtonComponent from './components/tpk-select-search/button';
import type TpkSelectSearchInputComponent from './components/tpk-select-search/input';
import type TpkSelectSearchLabelComponent from './components/tpk-select-search/label';
import type TpkSelectSearchOptionsComponent from './components/tpk-select-search/options';
import type TpkSelectSearchOptionsOption from './components/tpk-select-search/options/option';
import type TpkSelectButtonComponent from './components/tpk-select/button';
import type TpkSelectLabelComponent from './components/tpk-select/label';
import type TpkSelectOptionsComponent from './components/tpk-select/options';
import type TpkSelectContainerOptionsOption from './components/tpk-select/options/option';
import type TpkTextareaComponent from './components/tpk-textarea';
import type TpkTextareaInputComponent from './components/tpk-textarea/input';
import type TpkTextareaLabelComponent from './components/tpk-textarea/label';

export default interface Registry {
  'tpk-checkbox/input': typeof TpkCheckboxInputComponent;
  TpkCheckboxInput: typeof TpkCheckboxInputComponent;
  'tpk-checkbox/label': typeof TpkCheckboxLabelComponent;
  TpkCheckboxLabel: typeof TpkCheckboxLabelComponent;
  'tpk-datepicker/input': typeof TpkDatepickerInputComponent;
  TpkDatepickerInput: typeof TpkDatepickerInputComponent;
  'tpk-datepicker/label': typeof TpkDatepickerLabelComponent;
  TpkDatepickerLabel: typeof TpkDatepickerLabelComponent;
  'tpk-file/input': typeof TpkFileInputComponent;
  TpkFileInput: typeof TpkFileInputComponent;
  'tpk-file/label': typeof TpkFileLabelComponent;
  TpkFileLabel: typeof TpkFileLabelComponent;
  'tpk-input/input': typeof TpkInputInputComponent;
  TpkInputInput: typeof TpkInputInputComponent;
  'tpk-radio/input': typeof TpkRadioInputComponent;
  TpkRadioInput: typeof TpkRadioInputComponent;
  'tpk-radio/label': typeof TpkRadioLabelComponent;
  TpkRadioLabel: typeof TpkRadioLabelComponent;
  'tpk-select/options/option': typeof TpkSelectContainerOptionsOption;
  TpkSelectOptionsOption: typeof TpkSelectContainerOptionsOption;
  'tpk-select/button': typeof TpkSelectButtonComponent;
  TpkSelectButton: typeof TpkSelectButtonComponent;
  'tpk-select/label': typeof TpkSelectLabelComponent;
  TpkSelectLabel: typeof TpkSelectLabelComponent;
  'tpk-select/options': typeof TpkSelectOptionsComponent;
  TpkSelectOptions: typeof TpkSelectOptionsComponent;
  'tpk-select-search/options/option': typeof TpkSelectSearchOptionsOption;
  TpkSelectSearchOptionsOption: typeof TpkSelectSearchOptionsOption;
  'tpk-select-search/button': typeof TpkSelectSearchButtonComponent;
  TpkSelectSearchButton: typeof TpkSelectSearchButtonComponent;
  'tpk-select-search/input': typeof TpkSelectSearchInputComponent;
  TpkSelectSearchInput: typeof TpkSelectSearchInputComponent;
  'tpk-select-search/label': typeof TpkSelectSearchLabelComponent;
  TpkSelectSearchLabel: typeof TpkSelectSearchLabelComponent;
  'tpk-select-search/options': typeof TpkSelectSearchOptionsComponent;
  TpkSelectSearchOptions: typeof TpkSelectSearchOptionsComponent;
  'tpk-textarea/label': typeof TpkTextareaLabelComponent;
  TpkTextareaLabel: typeof TpkTextareaLabelComponent;
  'tpk-textarea/input': typeof TpkTextareaInputComponent;
  TpkTextareaInput: typeof TpkTextareaInputComponent;
  'tpk-button': typeof TpkButtonComponent;
  TpkButton: typeof TpkButtonComponent;
  'tpk-checkbox': typeof TpkCheckboxComponent;
  TpkCheckbox: typeof TpkCheckboxComponent;
  'tpk-datepicker': typeof TpkDatepicker;
  TpkDatepicker: typeof TpkDatepicker;
  'tpk-file': typeof TpkFileComponent;
  TpkFile: typeof TpkFileComponent;
  'tpk-input': typeof TpkInputComponent;
  TpkInput: typeof TpkInputComponent;
  'tpk-radio': typeof TpkRadioComponent;
  TpkRadio: typeof TpkRadioComponent;
  'tpk-select-search': typeof TpkSelectSearchComponent;
  TpkSelectSearch: typeof TpkSelectSearchComponent;
  'tpk-select': typeof TpkSelectComponent;
  TpkSelect: typeof TpkSelectComponent;
  'tpk-textarea': typeof TpkTextareaComponent;
  TpkTextarea: typeof TpkTextareaComponent;
}
