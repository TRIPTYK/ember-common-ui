import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import TpkValidationTextareaComponent from '../components/tpk-validation-textarea.gts';
import TpkValidationInputComponent from '../components/tpk-validation-input.gts';
import TpkValidationSelect from '../components/tpk-validation-select.gts';
import TpkValidationCheckboxComponent from '../components/tpk-validation-checkbox.gts';
import TpkValidationRadioComponent from '../components/tpk-validation-radio.gts';
import TpkValidationFileComponent from '../components/tpk-validation-file.gts';
import TpkValidationDatepickerComponent from '../components/tpk-validation-datepicker.gts';
import TpkValidationInputPrefabComponent from '../components/prefabs/tpk-validation-input.gts';
import TpkValidationTextareaPrefabComponent from '../components/prefabs/tpk-validation-textarea.gts';
import TpkValidationSelectPrefabComponent from '../components/prefabs/tpk-validation-select.gts';
import TpkValidationSelectCreatePrefabComponent from '../components/prefabs/tpk-validation-select-create.gts';
import TpkValidationSelectSearchPrefabComponent from '../components/prefabs/tpk-validation-select-search.gts';
import TpkValidationCheckboxPrefabComponent from '../components/prefabs/tpk-validation-checkbox.gts';
import TpkValidationDatepickerRangePrefabComponent from '../components/prefabs/tpk-validation-datepicker-range.gts';
import TpkValidationTimepickerPrefabComponent from '../components/prefabs/tpk-validation-timepicker.gts';
import TpkValidationPasswordPrefabComponent from '../components/prefabs/tpk-validation-password.gts';
import TpkValidationCurrencyPrefabComponent from '../components/prefabs/tpk-validation-currency.gts';
import TpkValidationIntegerComponent from '../components/prefabs/tpk-validation-integer.gts';
import TpkValidationEmailPrefabComponent from '../components/prefabs/tpk-validation-email.gts';
import TpkValidationIBANPrefabComponent from '../components/prefabs/tpk-validation-iban.gts';
import TpkValidationMobilePrefabComponent from '../components/prefabs/tpk-validation-mobile.gts';
import TpkValidationNumberPrefabComponent from '../components/prefabs/tpk-validation-number.gts';
import TpkValidationBicPrefabComponent from '../components/prefabs/tpk-validation-bic.gts';
import TpkValidationNationalNumberPrefabComponent from '../components/prefabs/tpk-validation-national-number.gts';
import TpkValidationVATPrefabComponent from '../components/prefabs/tpk-validation-vat.gts';

export default class TpkFormService extends Service {
  @tracked TpkInput = TpkValidationInputComponent;
  @tracked TpkInputPrefab = TpkValidationInputPrefabComponent;
  @tracked TpkTextarea = TpkValidationTextareaComponent;
  @tracked TpkTextareaPrefab = TpkValidationTextareaPrefabComponent;
  @tracked TpkSelect = TpkValidationSelect;
  @tracked TpkSelectPrefab = TpkValidationSelectPrefabComponent;
  @tracked TpkSelectCreatePrefab = TpkValidationSelectCreatePrefabComponent;
  @tracked TpkSelectSearchPrefab = TpkValidationSelectSearchPrefabComponent;
  @tracked TpkCheckbox = TpkValidationCheckboxComponent;
  @tracked TpkCheckboxPrefab = TpkValidationCheckboxPrefabComponent;
  @tracked TpkRadio = TpkValidationRadioComponent;
  @tracked TpkFile = TpkValidationFileComponent;
  @tracked TpkDatepicker = TpkValidationDatepickerComponent;
  @tracked TpkDatepickerRangePrefab = TpkValidationDatepickerRangePrefabComponent;
  @tracked TpkTimepickerPrefab = TpkValidationTimepickerPrefabComponent;
  @tracked TpkPasswordPrefab = TpkValidationPasswordPrefabComponent;
  @tracked TpkEmailPrefab = TpkValidationEmailPrefabComponent;
  @tracked TpkIbanPrefab = TpkValidationIBANPrefabComponent;
  @tracked TpkBicPrefab = TpkValidationBicPrefabComponent;
  @tracked TpkVatPrefab = TpkValidationVATPrefabComponent;
  @tracked TpkNationalNumberPrefab = TpkValidationNationalNumberPrefabComponent;
  @tracked TpkCurrencyPrefab = TpkValidationCurrencyPrefabComponent;
  @tracked TpkIntegerPrefab = TpkValidationIntegerComponent;
  @tracked TpkNumberPrefab = TpkValidationNumberPrefabComponent;
  @tracked TpkMobilePrefab = TpkValidationMobilePrefabComponent;
}

declare module '@ember/service' {
  interface Registry {
    'tpk-form': TpkFormService;
  }
}
