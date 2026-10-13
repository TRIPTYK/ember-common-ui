import TpkValidationRadioGroup from './components/tpk-validation-radio-group';
import TpkValidationCheckbox from './components/tpk-validation-checkbox';
import TpkValidationDatepicker from './components/tpk-validation-datepicker';
import TpkValidationFile from './components/tpk-validation-file';
import TpkValidationInput from './components/tpk-validation-input';
import TpkValidationRadio from './components/tpk-validation-radio';
import TpkValidationSelectComponent from './components/tpk-validation-select';
import TpkValidationTextarea from './components/tpk-validation-textarea';
import type TpkForm from './components/tpk-form';
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
//# sourceMappingURL=template-registry.d.ts.map