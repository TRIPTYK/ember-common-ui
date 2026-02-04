import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import TpkValidationTextareaComponent from './components/tpk-validation-textarea.js';
import TpkValidationInputComponent from './components/tpk-validation-input.js';
import TpkValidationSelect from './components/tpk-validation-select.js';
import TpkValidationCheckboxComponent from './components/tpk-validation-checkbox.js';
import TpkValidationRadioComponent from './components/tpk-validation-radio.js';
import TpkValidationFileComponent from './components/tpk-validation-file.js';
import TpkValidationDatepickerComponent from './components/tpk-validation-datepicker.js';
import TpkValidationInputPrefabComponent from './components/prefabs/tpk-validation-input.js';
import TpkValidationTextareaPrefabComponent from './components/prefabs/tpk-validation-textarea.js';
import TpkValidationSelectPrefabComponent from './components/prefabs/tpk-validation-select.js';
import TpkValidationSelectCreatePrefabComponent from './components/prefabs/tpk-validation-select-create.js';
import TpkValidationSelectSearchPrefabComponent from './components/prefabs/tpk-validation-select-search.js';
import TpkValidationCheckboxPrefabComponent from './components/prefabs/tpk-validation-checkbox.js';
import TpkValidationDatepickerRangePrefabComponent from './components/prefabs/tpk-validation-datepicker-range.js';
import TpkValidationDatepickerPrefabComponent from './components/prefabs/tpk-validation-datepicker.js';
import TpkValidationTimepickerPrefabComponent from './components/prefabs/tpk-validation-timepicker.js';
import TpkValidationPasswordPrefabComponent from './components/prefabs/tpk-validation-password.js';
import TpkValidationCurrencyPrefabComponent from './components/prefabs/tpk-validation-currency.js';
import TpkValidationIntegerComponent from './components/prefabs/tpk-validation-integer.js';
import TpkValidationEmailPrefabComponent from './components/prefabs/tpk-validation-email.js';
import TpkValidationIBANPrefabComponent from './components/prefabs/tpk-validation-iban.js';
import TpkValidationMobilePrefabComponent from './components/prefabs/tpk-validation-mobile.js';
import TpkValidationNumberPrefabComponent from './components/prefabs/tpk-validation-number.js';
import TpkValidationBicPrefabComponent from './components/prefabs/tpk-validation-bic.js';
import TpkValidationNationalNumberPrefabComponent from './components/prefabs/tpk-validation-national-number.js';
import TpkValidationVATPrefabComponent from './components/prefabs/tpk-validation-vat.js';
import TpkValidationRadioGroupComponent from './components/tpk-validation-radio-group.js';
import TpkValidationRadioPrefabComponent from './components/prefabs/tpk-validation-radio.js';
import TpkValidationRadioGroupPrefabComponent from './components/prefabs/tpk-validation-radio-group.js';
import TpkValidationFilePrefabComponent from './components/prefabs/tpk-validation-file.js';
import { g, i } from 'decorator-transforms/runtime-esm';

class TpkFormService extends Service {
  static {
    g(this.prototype, "TpkInput", [tracked], function () {
      return TpkValidationInputComponent;
    });
  }
  #TpkInput = (i(this, "TpkInput"), void 0);
  static {
    g(this.prototype, "TpkInputPrefab", [tracked], function () {
      return TpkValidationInputPrefabComponent;
    });
  }
  #TpkInputPrefab = (i(this, "TpkInputPrefab"), void 0);
  static {
    g(this.prototype, "TpkTextarea", [tracked], function () {
      return TpkValidationTextareaComponent;
    });
  }
  #TpkTextarea = (i(this, "TpkTextarea"), void 0);
  static {
    g(this.prototype, "TpkTextareaPrefab", [tracked], function () {
      return TpkValidationTextareaPrefabComponent;
    });
  }
  #TpkTextareaPrefab = (i(this, "TpkTextareaPrefab"), void 0);
  static {
    g(this.prototype, "TpkSelect", [tracked], function () {
      return TpkValidationSelect;
    });
  }
  #TpkSelect = (i(this, "TpkSelect"), void 0);
  static {
    g(this.prototype, "TpkSelectPrefab", [tracked], function () {
      return TpkValidationSelectPrefabComponent;
    });
  }
  #TpkSelectPrefab = (i(this, "TpkSelectPrefab"), void 0);
  static {
    g(this.prototype, "TpkSelectCreatePrefab", [tracked], function () {
      return TpkValidationSelectCreatePrefabComponent;
    });
  }
  #TpkSelectCreatePrefab = (i(this, "TpkSelectCreatePrefab"), void 0);
  static {
    g(this.prototype, "TpkSelectSearchPrefab", [tracked], function () {
      return TpkValidationSelectSearchPrefabComponent;
    });
  }
  #TpkSelectSearchPrefab = (i(this, "TpkSelectSearchPrefab"), void 0);
  static {
    g(this.prototype, "TpkCheckbox", [tracked], function () {
      return TpkValidationCheckboxComponent;
    });
  }
  #TpkCheckbox = (i(this, "TpkCheckbox"), void 0);
  static {
    g(this.prototype, "TpkCheckboxPrefab", [tracked], function () {
      return TpkValidationCheckboxPrefabComponent;
    });
  }
  #TpkCheckboxPrefab = (i(this, "TpkCheckboxPrefab"), void 0);
  static {
    g(this.prototype, "TpkRadio", [tracked], function () {
      return TpkValidationRadioComponent;
    });
  }
  #TpkRadio = (i(this, "TpkRadio"), void 0);
  static {
    g(this.prototype, "TpkFile", [tracked], function () {
      return TpkValidationFileComponent;
    });
  }
  #TpkFile = (i(this, "TpkFile"), void 0);
  static {
    g(this.prototype, "TpkDatepicker", [tracked], function () {
      return TpkValidationDatepickerComponent;
    });
  }
  #TpkDatepicker = (i(this, "TpkDatepicker"), void 0);
  static {
    g(this.prototype, "TpkDatepickerPrefab", [tracked], function () {
      return TpkValidationDatepickerPrefabComponent;
    });
  }
  #TpkDatepickerPrefab = (i(this, "TpkDatepickerPrefab"), void 0);
  static {
    g(this.prototype, "TpkDatepickerRangePrefab", [tracked], function () {
      return TpkValidationDatepickerRangePrefabComponent;
    });
  }
  #TpkDatepickerRangePrefab = (i(this, "TpkDatepickerRangePrefab"), void 0);
  static {
    g(this.prototype, "TpkTimepickerPrefab", [tracked], function () {
      return TpkValidationTimepickerPrefabComponent;
    });
  }
  #TpkTimepickerPrefab = (i(this, "TpkTimepickerPrefab"), void 0);
  static {
    g(this.prototype, "TpkPasswordPrefab", [tracked], function () {
      return TpkValidationPasswordPrefabComponent;
    });
  }
  #TpkPasswordPrefab = (i(this, "TpkPasswordPrefab"), void 0);
  static {
    g(this.prototype, "TpkEmailPrefab", [tracked], function () {
      return TpkValidationEmailPrefabComponent;
    });
  }
  #TpkEmailPrefab = (i(this, "TpkEmailPrefab"), void 0);
  static {
    g(this.prototype, "TpkIbanPrefab", [tracked], function () {
      return TpkValidationIBANPrefabComponent;
    });
  }
  #TpkIbanPrefab = (i(this, "TpkIbanPrefab"), void 0);
  static {
    g(this.prototype, "TpkBicPrefab", [tracked], function () {
      return TpkValidationBicPrefabComponent;
    });
  }
  #TpkBicPrefab = (i(this, "TpkBicPrefab"), void 0);
  static {
    g(this.prototype, "TpkVatPrefab", [tracked], function () {
      return TpkValidationVATPrefabComponent;
    });
  }
  #TpkVatPrefab = (i(this, "TpkVatPrefab"), void 0);
  static {
    g(this.prototype, "TpkNationalNumberPrefab", [tracked], function () {
      return TpkValidationNationalNumberPrefabComponent;
    });
  }
  #TpkNationalNumberPrefab = (i(this, "TpkNationalNumberPrefab"), void 0);
  static {
    g(this.prototype, "TpkCurrencyPrefab", [tracked], function () {
      return TpkValidationCurrencyPrefabComponent;
    });
  }
  #TpkCurrencyPrefab = (i(this, "TpkCurrencyPrefab"), void 0);
  static {
    g(this.prototype, "TpkIntegerPrefab", [tracked], function () {
      return TpkValidationIntegerComponent;
    });
  }
  #TpkIntegerPrefab = (i(this, "TpkIntegerPrefab"), void 0);
  static {
    g(this.prototype, "TpkNumberPrefab", [tracked], function () {
      return TpkValidationNumberPrefabComponent;
    });
  }
  #TpkNumberPrefab = (i(this, "TpkNumberPrefab"), void 0);
  static {
    g(this.prototype, "TpkMobilePrefab", [tracked], function () {
      return TpkValidationMobilePrefabComponent;
    });
  }
  #TpkMobilePrefab = (i(this, "TpkMobilePrefab"), void 0);
  static {
    g(this.prototype, "TpkRadioGroup", [tracked], function () {
      return TpkValidationRadioGroupComponent;
    });
  }
  #TpkRadioGroup = (i(this, "TpkRadioGroup"), void 0);
  static {
    g(this.prototype, "TpkRadioPrefab", [tracked], function () {
      return TpkValidationRadioPrefabComponent;
    });
  }
  #TpkRadioPrefab = (i(this, "TpkRadioPrefab"), void 0);
  static {
    g(this.prototype, "TpkRadioGroupPrefab", [tracked], function () {
      return TpkValidationRadioGroupPrefabComponent;
    });
  }
  #TpkRadioGroupPrefab = (i(this, "TpkRadioGroupPrefab"), void 0);
  static {
    g(this.prototype, "TpkFilePrefab", [tracked], function () {
      return TpkValidationFilePrefabComponent;
    });
  }
  #TpkFilePrefab = (i(this, "TpkFilePrefab"), void 0);
}

var TpkFormServiceModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: TpkFormService
});

export { TpkFormServiceModule as T, TpkFormService as a };
//# sourceMappingURL=tpk-form-CnmjxZj8.js.map
