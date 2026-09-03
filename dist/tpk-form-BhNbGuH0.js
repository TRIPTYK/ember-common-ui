import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import TpkValidationTextarea from './components/tpk-validation-textarea.js';
import TpkValidationInput from './components/tpk-validation-input.js';
import TpkValidationSelect from './components/tpk-validation-select.js';
import TpkValidationCheckbox from './components/tpk-validation-checkbox.js';
import TpkValidationRadio from './components/tpk-validation-radio.js';
import TpkValidationFile from './components/tpk-validation-file.js';
import TpkValidationDatepicker from './components/tpk-validation-datepicker.js';
import TpkValidationInputPrefab from './components/prefabs/tpk-validation-input.js';
import TpkValidationTextareaPrefab from './components/prefabs/tpk-validation-textarea.js';
import TpkValidationSelectPrefab from './components/prefabs/tpk-validation-select.js';
import TpkValidationSelectCreatePrefab from './components/prefabs/tpk-validation-select-create.js';
import TpkValidationSelectSearchPrefab from './components/prefabs/tpk-validation-select-search.js';
import TpkValidationCheckboxPrefab from './components/prefabs/tpk-validation-checkbox.js';
import TpkValidationDatepickerRangePrefab from './components/prefabs/tpk-validation-datepicker-range.js';
import TpkValidationDatepickerPrefab from './components/prefabs/tpk-validation-datepicker.js';
import TpkValidationTimepickerPrefab from './components/prefabs/tpk-validation-timepicker.js';
import TpkValidationPasswordPrefab from './components/prefabs/tpk-validation-password.js';
import TpkValidationCurrencyPrefab from './components/prefabs/tpk-validation-currency.js';
import TpkValidationInteger from './components/prefabs/tpk-validation-integer.js';
import TpkValidationEmailPrefab from './components/prefabs/tpk-validation-email.js';
import TpkValidationIBANPrefab from './components/prefabs/tpk-validation-iban.js';
import TpkValidationMobilePrefab from './components/prefabs/tpk-validation-mobile.js';
import TpkValidationNumberPrefab from './components/prefabs/tpk-validation-number.js';
import TpkValidationBicPrefab from './components/prefabs/tpk-validation-bic.js';
import TpkValidationNationalNumberPrefab from './components/prefabs/tpk-validation-national-number.js';
import TpkValidationVATPrefab from './components/prefabs/tpk-validation-vat.js';
import TpkValidationRadioGroup from './components/tpk-validation-radio-group.js';
import TpkValidationRadioPrefab from './components/prefabs/tpk-validation-radio.js';
import TpkValidationRadioGroupPrefab from './components/prefabs/tpk-validation-radio-group.js';
import TpkValidationFilePrefab from './components/prefabs/tpk-validation-file.js';
import { g, i } from 'decorator-transforms/runtime-esm';

class TpkFormService extends Service {
  static {
    g(this.prototype, "TpkInput", [tracked], function () {
      return TpkValidationInput;
    });
  }
  #TpkInput = (i(this, "TpkInput"), void 0);
  static {
    g(this.prototype, "TpkInputPrefab", [tracked], function () {
      return TpkValidationInputPrefab;
    });
  }
  #TpkInputPrefab = (i(this, "TpkInputPrefab"), void 0);
  static {
    g(this.prototype, "TpkTextarea", [tracked], function () {
      return TpkValidationTextarea;
    });
  }
  #TpkTextarea = (i(this, "TpkTextarea"), void 0);
  static {
    g(this.prototype, "TpkTextareaPrefab", [tracked], function () {
      return TpkValidationTextareaPrefab;
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
      return TpkValidationSelectPrefab;
    });
  }
  #TpkSelectPrefab = (i(this, "TpkSelectPrefab"), void 0);
  static {
    g(this.prototype, "TpkSelectCreatePrefab", [tracked], function () {
      return TpkValidationSelectCreatePrefab;
    });
  }
  #TpkSelectCreatePrefab = (i(this, "TpkSelectCreatePrefab"), void 0);
  static {
    g(this.prototype, "TpkSelectSearchPrefab", [tracked], function () {
      return TpkValidationSelectSearchPrefab;
    });
  }
  #TpkSelectSearchPrefab = (i(this, "TpkSelectSearchPrefab"), void 0);
  static {
    g(this.prototype, "TpkCheckbox", [tracked], function () {
      return TpkValidationCheckbox;
    });
  }
  #TpkCheckbox = (i(this, "TpkCheckbox"), void 0);
  static {
    g(this.prototype, "TpkCheckboxPrefab", [tracked], function () {
      return TpkValidationCheckboxPrefab;
    });
  }
  #TpkCheckboxPrefab = (i(this, "TpkCheckboxPrefab"), void 0);
  static {
    g(this.prototype, "TpkRadio", [tracked], function () {
      return TpkValidationRadio;
    });
  }
  #TpkRadio = (i(this, "TpkRadio"), void 0);
  static {
    g(this.prototype, "TpkFile", [tracked], function () {
      return TpkValidationFile;
    });
  }
  #TpkFile = (i(this, "TpkFile"), void 0);
  static {
    g(this.prototype, "TpkDatepicker", [tracked], function () {
      return TpkValidationDatepicker;
    });
  }
  #TpkDatepicker = (i(this, "TpkDatepicker"), void 0);
  static {
    g(this.prototype, "TpkDatepickerPrefab", [tracked], function () {
      return TpkValidationDatepickerPrefab;
    });
  }
  #TpkDatepickerPrefab = (i(this, "TpkDatepickerPrefab"), void 0);
  static {
    g(this.prototype, "TpkDatepickerRangePrefab", [tracked], function () {
      return TpkValidationDatepickerRangePrefab;
    });
  }
  #TpkDatepickerRangePrefab = (i(this, "TpkDatepickerRangePrefab"), void 0);
  static {
    g(this.prototype, "TpkTimepickerPrefab", [tracked], function () {
      return TpkValidationTimepickerPrefab;
    });
  }
  #TpkTimepickerPrefab = (i(this, "TpkTimepickerPrefab"), void 0);
  static {
    g(this.prototype, "TpkPasswordPrefab", [tracked], function () {
      return TpkValidationPasswordPrefab;
    });
  }
  #TpkPasswordPrefab = (i(this, "TpkPasswordPrefab"), void 0);
  static {
    g(this.prototype, "TpkEmailPrefab", [tracked], function () {
      return TpkValidationEmailPrefab;
    });
  }
  #TpkEmailPrefab = (i(this, "TpkEmailPrefab"), void 0);
  static {
    g(this.prototype, "TpkIbanPrefab", [tracked], function () {
      return TpkValidationIBANPrefab;
    });
  }
  #TpkIbanPrefab = (i(this, "TpkIbanPrefab"), void 0);
  static {
    g(this.prototype, "TpkBicPrefab", [tracked], function () {
      return TpkValidationBicPrefab;
    });
  }
  #TpkBicPrefab = (i(this, "TpkBicPrefab"), void 0);
  static {
    g(this.prototype, "TpkVatPrefab", [tracked], function () {
      return TpkValidationVATPrefab;
    });
  }
  #TpkVatPrefab = (i(this, "TpkVatPrefab"), void 0);
  static {
    g(this.prototype, "TpkNationalNumberPrefab", [tracked], function () {
      return TpkValidationNationalNumberPrefab;
    });
  }
  #TpkNationalNumberPrefab = (i(this, "TpkNationalNumberPrefab"), void 0);
  static {
    g(this.prototype, "TpkCurrencyPrefab", [tracked], function () {
      return TpkValidationCurrencyPrefab;
    });
  }
  #TpkCurrencyPrefab = (i(this, "TpkCurrencyPrefab"), void 0);
  static {
    g(this.prototype, "TpkIntegerPrefab", [tracked], function () {
      return TpkValidationInteger;
    });
  }
  #TpkIntegerPrefab = (i(this, "TpkIntegerPrefab"), void 0);
  static {
    g(this.prototype, "TpkNumberPrefab", [tracked], function () {
      return TpkValidationNumberPrefab;
    });
  }
  #TpkNumberPrefab = (i(this, "TpkNumberPrefab"), void 0);
  static {
    g(this.prototype, "TpkMobilePrefab", [tracked], function () {
      return TpkValidationMobilePrefab;
    });
  }
  #TpkMobilePrefab = (i(this, "TpkMobilePrefab"), void 0);
  static {
    g(this.prototype, "TpkRadioGroup", [tracked], function () {
      return TpkValidationRadioGroup;
    });
  }
  #TpkRadioGroup = (i(this, "TpkRadioGroup"), void 0);
  static {
    g(this.prototype, "TpkRadioPrefab", [tracked], function () {
      return TpkValidationRadioPrefab;
    });
  }
  #TpkRadioPrefab = (i(this, "TpkRadioPrefab"), void 0);
  static {
    g(this.prototype, "TpkRadioGroupPrefab", [tracked], function () {
      return TpkValidationRadioGroupPrefab;
    });
  }
  #TpkRadioGroupPrefab = (i(this, "TpkRadioGroupPrefab"), void 0);
  static {
    g(this.prototype, "TpkFilePrefab", [tracked], function () {
      return TpkValidationFilePrefab;
    });
  }
  #TpkFilePrefab = (i(this, "TpkFilePrefab"), void 0);
}

var TpkFormServiceModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: TpkFormService
});

export { TpkFormServiceModule as T, TpkFormService as a };
//# sourceMappingURL=tpk-form-BhNbGuH0.js.map
