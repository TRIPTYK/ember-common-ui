import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { assert, debug } from '@ember/debug';
import { isChangeset, ImmerChangeset } from 'ember-immer-changeset';
import { ZodObject } from 'zod';
import { isFieldError } from '../utils/is-field-error.js';
import perform from 'ember-concurrency/helpers/perform';
import { validateOneAndMapErrors, validateAndMapErrors } from '../utils/validate-and-map.js';
import './tpk-validation-input.js';
import './tpk-validation-textarea.js';
import './tpk-validation-select.js';
import './tpk-validation-file.js';
import './tpk-validation-radio.js';
import './tpk-validation-checkbox.js';
import './tpk-validation-datepicker.js';
import '../tpk-form-CnmjxZj8.js';
import './prefabs/tpk-validation-input.js';
import { getRequiredFields } from '../utils/get-required-fields.js';
import { tracked } from '@glimmer/tracking';
import scrollOnErrorModifier from '../modifiers/scroll-on-error.js';
import { on } from '@ember/modifier';
import { hash } from '@ember/helper';
import { trackedArray } from '@ember/reactive/collections';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class ChangesetFormComponent extends Component {
  static {
    g(this.prototype, "requiredFields", [tracked], function () {
      return trackedArray([]);
    });
  }
  #requiredFields = (i(this, "requiredFields"), void 0);
  static {
    g(this.prototype, "tpkForm", [service]);
  }
  #tpkForm = (i(this, "tpkForm"), void 0);
  constructor(owner, args) {
    super(owner, args);
    assert('@changeset is required and must be an ImmerChangeset', isChangeset(args.changeset) && args.changeset instanceof ImmerChangeset);
    assert('@onSubmit is required', typeof args.onSubmit === 'function');
    assert('@validationSchema is required', args.validationSchema instanceof ZodObject);
    assert('service:tpk-form is available', this.tpkForm !== undefined);
    this.requiredFields = getRequiredFields(this.args.validationSchema, this.args.changeset.data) ?? [];
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.args.changeset.onSet(async k => {
      debug('Changeset key changed (for required fields): ' + k);
      await this.args.changeset.validate(draft => {
        this.requiredFields = getRequiredFields(this.args.validationSchema, draft) ?? [];
      });
    });
    if (args.reactive ?? true) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this.args.changeset.onSet(async key => {
        debug(`Changeset key changed: ${key}`);
        await this.args.changeset.validate(async draft => {
          const errors = await validateOneAndMapErrors(key, this.args.validationSchema, draft);
          for (const error of this.args.changeset.errors) {
            if (isFieldError(key, error.key)) {
              this.args.changeset.removeError(error.key);
            }
          }
          for (const error of errors) {
            this.args.changeset.addError(error);
          }
        });
      });
    }
  }
  validateAndSubmit = buildTask(() => ({
    context: this,
    generator: function* () {
      debug(`Submitting form with changeset: ${JSON.stringify(this.args.changeset['draftData'], null, 2)}`);
      if (this.args.removeErrorsOnSubmit ?? true) {
        debug(`Removed ${this.args.changeset.errors.length} errors before submit`);
        this.args.changeset.removeErrors();
      }
      yield this.args.changeset.validate(async dto => {
        const errors = await validateAndMapErrors(this.args.validationSchema, dto);
        debug(`Errors after validation: ${JSON.stringify(errors, null, 2)}`);
        for (const error of errors) {
          this.args.changeset.addError(error);
        }
      });
      if (!this.args.changeset.isValid) {
        debug('Changeset is not valid, aborting submit');
        return;
      }
      if (this.args.executeOnValid ?? true) {
        debug('Changeset is valid, executing changeset');
        this.args.changeset.execute();
      }
      debug('Calling onSubmit callback');
      yield this.args.onSubmit(this.args.changeset.data,
      // It is theorically safe. The only way it could be unsafe is if the user unexecutes the changeset after validation. If this is the case, the type will mismatch the runtime type. We will rarely do that so it's fine at the moment.
      this.args.changeset);
    }
  }), {
    drop: true
  }, "validateAndSubmit", null);
  submit = buildTask(() => ({
    context: this,
    generator: function* (e) {
      e.preventDefault();
      yield this.validateAndSubmit.perform();
    }
  }), null, "submit", null);
  changesetGet = path => {
    return this.args.changeset.get(path);
  };
  get errorsForScroll() {
    return this.args.autoScrollOnError ?? true ? this.args.changeset.errors : [];
  }
  static {
    setComponentTemplate(precompileTemplate("<form {{on \"submit\" (perform this.submit)}} {{scrollOnError this.errorsForScroll}} ...attributes>\n  {{yield (hash TpkInput=(component this.tpkForm.TpkInput changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkInputPrefab=(component this.tpkForm.TpkInputPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkTextarea=(component this.tpkForm.TpkTextarea changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkTextareaPrefab=(component this.tpkForm.TpkTextareaPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkSelect=(component this.tpkForm.TpkSelect changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkSelectPrefab=(component this.tpkForm.TpkSelectPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkSelectCreatePrefab=(component this.tpkForm.TpkSelectCreatePrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkSelectSearchPrefab=(component this.tpkForm.TpkSelectSearchPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkCheckbox=(component this.tpkForm.TpkCheckbox changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkCheckboxPrefab=(component this.tpkForm.TpkCheckboxPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkRadio=(component this.tpkForm.TpkRadio changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkFile=(component this.tpkForm.TpkFile changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkDatepicker=(component this.tpkForm.TpkDatepicker changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkDatepickerPrefab=(component this.tpkForm.TpkDatepickerPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkDatepickerRangePrefab=(component this.tpkForm.TpkDatepickerRangePrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkTimepickerPrefab=(component this.tpkForm.TpkTimepickerPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkPasswordPrefab=(component this.tpkForm.TpkPasswordPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkEmailPrefab=(component this.tpkForm.TpkEmailPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkIbanPrefab=(component this.tpkForm.TpkIbanPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkBicPrefab=(component this.tpkForm.TpkBicPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkVatPrefab=(component this.tpkForm.TpkVatPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkNationalNumberPrefab=(component this.tpkForm.TpkNationalNumberPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkCurrencyPrefab=(component this.tpkForm.TpkCurrencyPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkIntegerPrefab=(component this.tpkForm.TpkIntegerPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkNumberPrefab=(component this.tpkForm.TpkNumberPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkMobilePrefab=(component this.tpkForm.TpkMobilePrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkRadioGroup=(component this.tpkForm.TpkRadioGroup changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkRadioPrefab=(component this.tpkForm.TpkRadioPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkRadioGroupPrefab=(component this.tpkForm.TpkRadioGroupPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) TpkFilePrefab=(component this.tpkForm.TpkFilePrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields) changesetGet=this.changesetGet requiredFields=this.requiredFields)}}\n</form>", {
      strictMode: true,
      scope: () => ({
        on,
        perform,
        scrollOnError: scrollOnErrorModifier,
        hash
      })
    }), this);
  }
}

export { ChangesetFormComponent as default };
//# sourceMappingURL=tpk-form.js.map
