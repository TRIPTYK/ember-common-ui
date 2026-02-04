import TpkValidationRadioGroupComponent from './components/tpk-validation-radio-group';
import TpkValidationCheckboxComponent from './components/tpk-validation-checkbox';
import TpkValidationDatepicker from './components/tpk-validation-datepicker';
import TpkValidationFileComponent from './components/tpk-validation-file';
import TpkValidationInputComponent from './components/tpk-validation-input';
import TpkValidationRadioComponent from './components/tpk-validation-radio';
import TpkValidationSelectComponent from './components/tpk-validation-select';
import TpkValidationTextareaComponent from './components/tpk-validation-textarea';
import type ChangesetFormComponent from './components/tpk-form';
export default interface Registry {
    'tpk-validation-checkbox': typeof TpkValidationCheckboxComponent;
    TpkValidationCheckbox: typeof TpkValidationCheckboxComponent;
    'tpk-validation-datepicker': typeof TpkValidationDatepicker;
    TpkValidationDatepicker: typeof TpkValidationDatepicker;
    'tpk-validation-file': typeof TpkValidationFileComponent;
    TpkValidationFile: typeof TpkValidationFileComponent;
    'tpk-validation-input': typeof TpkValidationInputComponent;
    TpkValidationInput: typeof TpkValidationInputComponent;
    'tpk-validation-radio-group': typeof TpkValidationRadioGroupComponent;
    TpkValidationRadioGroup: typeof TpkValidationRadioGroupComponent;
    'tpk-validation-radio': typeof TpkValidationRadioComponent;
    TpkValidationRadio: typeof TpkValidationRadioComponent;
    'tpk-validation-select': typeof TpkValidationSelectComponent;
    TpkValidationSelect: typeof TpkValidationSelectComponent;
    'tpk-validation-textarea': typeof TpkValidationTextareaComponent;
    TpkValidationTextarea: typeof TpkValidationTextareaComponent;
    'tpk-form': typeof ChangesetFormComponent;
}
//# sourceMappingURL=template-registry.d.ts.map