import type Owner from '@ember/owner';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type { Promisable } from 'type-fest';
import { assert } from '@ember/debug';
import { task } from 'ember-concurrency';
import { ImmerChangeset, isChangeset } from 'ember-immer-changeset';
import { Schema } from 'yup';
import { isFieldError } from '../utils/is-field-error.ts';
import perform from 'ember-concurrency/helpers/perform';
import {
  validateAndMapErrors,
  validateOneAndMapErrors,
} from '../utils/validate-and-map.ts';
import type { WithBoundArgs } from '@glint/template';
import TpkValidationInputComponent from '../components/tpk-validation-input.gts';
import TpkValidationTextareaComponent from '../components/tpk-validation-textarea.gts';
import TpkValidationSelect from '../components/tpk-validation-select.gts';
import TpkValidationFileComponent from '../components/tpk-validation-file.gts';
import TpkValidationRadioComponent from '../components/tpk-validation-radio.gts';
import TpkValidationCheckboxComponent from '../components/tpk-validation-checkbox.gts';
import TpkValidationDatepickerComponent from '../components/tpk-validation-datepicker.gts';
import TpkFormService from '../services/tpk-form.ts';
import TpkValidationInputPrefabComponent from '../components/prefabs/tpk-validation-input.gts';
import type TpkValidationTextareaPrefabComponent from './prefabs/tpk-validation-textarea.gts';
import type TpkValidationSelectPrefabComponent from './prefabs/tpk-validation-select.gts';
import type TpkValidationSelectCreatePrefabComponent from './prefabs/tpk-validation-select-create.gts';
import type TpkValidationSelectSearchPrefabComponent from './prefabs/tpk-validation-select-search.gts';
import type TpkValidationCheckboxPrefabComponent from './prefabs/tpk-validation-checkbox.gts';
import type TpkValidationDatepickerRangePrefabComponent from './prefabs/tpk-validation-datepicker-range.gts';
import type TpkValidationTimepickerPrefabComponent from './prefabs/tpk-validation-timepicker.gts';
import type TpkValidationPasswordPrefabComponent from './prefabs/tpk-validation-password.gts';
import type TpkValidationCurrencyPrefabComponent from './prefabs/tpk-validation-currency.gts';
import type TpkValidationIntegerComponent from '../components/prefabs/tpk-validation-integer.gts';
import type TpkValidationEmailPrefabComponent from './prefabs/tpk-validation-email.gts';
import type TpkValidationIBANPrefabComponent from './prefabs/tpk-validation-iban.gts';
import type TpkValidationMobilePrefabComponent from './prefabs/tpk-validation-mobile.gts';
import type TpkValidationNumberPrefabComponent from './prefabs/tpk-validation-number.gts';
import type TpkValidationBicPrefabComponent from './prefabs/tpk-validation-bic.gts';
import type TpkValidationNationalNumberPrefabComponent from './prefabs/tpk-validation-national-number.gts';
import type TpkValidationVATPrefabComponent from './prefabs/tpk-validation-vat.gts';
import { getRequiredFields } from '../utils/get-required-fields.ts';
import { tracked } from '@glimmer/tracking';
import scrollOnError from '../modifiers/scroll-on-error.ts';
import { on } from '@ember/modifier';
import { hash } from '@ember/helper';

interface ChangesetFormComponentArgs<T extends ImmerChangeset> {
  changeset: T;
  onSubmit: (changeset: T) => Promisable<unknown>;
  validationSchema: Schema;
  reactive?: boolean;
  removeErrorsOnSubmit?: boolean;
  autoScrollOnError?: boolean;
  disabled?: boolean;
  executeOnValid?: boolean;
}

export interface ChangesetFormComponentSignature<T extends ImmerChangeset> {
  Args: ChangesetFormComponentArgs<T>;
  Blocks: {
    default: [
      {
        TpkInput: WithBoundArgs<
          typeof TpkValidationInputComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkInputPrefab: WithBoundArgs<
          typeof TpkValidationInputPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkTextarea: WithBoundArgs<
          typeof TpkValidationTextareaComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkTextareaPrefab: WithBoundArgs<
          typeof TpkValidationTextareaPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkSelect: WithBoundArgs<
          typeof TpkValidationSelect,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkSelectPrefab: WithBoundArgs<
          typeof TpkValidationSelectPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkSelectCreatePrefab: WithBoundArgs<
          typeof TpkValidationSelectCreatePrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkSelectSearchPrefab: WithBoundArgs<
          typeof TpkValidationSelectSearchPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkCheckbox: WithBoundArgs<
          typeof TpkValidationCheckboxComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkCheckboxPrefab: WithBoundArgs<
          typeof TpkValidationCheckboxPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkRadio: WithBoundArgs<
          typeof TpkValidationRadioComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkFile: WithBoundArgs<
          typeof TpkValidationFileComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkDatepicker: WithBoundArgs<
          typeof TpkValidationDatepickerComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkDatepickerRangePrefab: WithBoundArgs<
          typeof TpkValidationDatepickerRangePrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkTimepickerPrefab: WithBoundArgs<
          typeof TpkValidationTimepickerPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkPasswordPrefab: WithBoundArgs<
          typeof TpkValidationPasswordPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkEmailPrefab: WithBoundArgs<
          typeof TpkValidationEmailPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkIbanPrefab: WithBoundArgs<
          typeof TpkValidationIBANPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkBicPrefab: WithBoundArgs<
          typeof TpkValidationBicPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkVatPrefab: WithBoundArgs<
          typeof TpkValidationVATPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkNationalNumberPrefab: WithBoundArgs<
          typeof TpkValidationNationalNumberPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkCurrencyPrefab: WithBoundArgs<
          typeof TpkValidationCurrencyPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkIntegerPrefab: WithBoundArgs<
          typeof TpkValidationIntegerComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkNumberPrefab: WithBoundArgs<
          typeof TpkValidationNumberPrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        TpkMobilePrefab: WithBoundArgs<
          typeof TpkValidationMobilePrefabComponent,
          'changeset' | 'disabled' | 'requiredFields'
        >;
        changesetGet: (path: string) => unknown;
        requiredFields: string[];
      },
    ];
  };
  Element: HTMLFormElement;
}

export default class ChangesetFormComponent<T extends ImmerChangeset> extends Component<ChangesetFormComponentSignature<T>> {
  @tracked declare requiredFields: string[]
  @service declare tpkForm: TpkFormService;

  public constructor(
    owner: Owner,
    args: ChangesetFormComponentArgs<T>,
  ) {
    super(owner, args);
    assert(
      '@changeset is required and must be an ImmerChangeset',
      isChangeset(args.changeset) && args.changeset instanceof ImmerChangeset,
    );
    assert('@onSubmit is required', typeof args.onSubmit === 'function');
    assert(
      '@validationSchema is required',
      args.validationSchema instanceof Schema,
    );

    this.requiredFields = getRequiredFields(this.args.validationSchema, this.args.changeset.data) ?? [];
    this.args.changeset.onSet(async () => {
      await this.args.changeset.validate((draft) => {
        this.requiredFields = getRequiredFields(this.args.validationSchema, draft) ?? [];
      })
    });

    if (args.reactive ?? true) {
      this.args.changeset.onSet(async (key) => {
        await this.args.changeset.validate(async (draft) => {
          const errors = await validateOneAndMapErrors(
            key,
            this.args.validationSchema,
            draft,
          );

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

  validateAndSubmit = task(this, { drop: true }, async () => {
    if (this.args.removeErrorsOnSubmit ?? true) {
      this.args.changeset.removeErrors();
    }

    await this.args.changeset.validate(async (dto) => {
      const errors = await validateAndMapErrors(
        this.args.validationSchema,
        dto,
      );
      for (const error of errors) {
        this.args.changeset.addError(error);
      }
    });

    if (!this.args.changeset.isValid) {
      return;
    }

    if (this.args.executeOnValid ?? true) {
      this.args.changeset.execute();
    }

    await this.args.onSubmit(this.args.changeset);
  });

  submit = task(this, async (e: Event) => {
    e.preventDefault();
    await this.validateAndSubmit.perform();
  });

  changesetGet = (path: string) => {
    return this.args.changeset.get(path);
  };

  get errorsForScroll() {
    return (this.args.autoScrollOnError ?? true) ? this.args.changeset.errors : [];
  }

  <template>
    <form {{on 'submit' (perform this.submit)}} {{scrollOnError this.errorsForScroll}} ...attributes>
      {{yield
        (hash
          TpkInput=(component
            this.tpkForm.TpkInput changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkInputPrefab=(component
            this.tpkForm.TpkInputPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkTextarea=(component
            this.tpkForm.TpkTextarea changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkTextareaPrefab=(component
            this.tpkForm.TpkTextareaPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkSelect=(component
            this.tpkForm.TpkSelect changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkSelectPrefab=(component
            this.tpkForm.TpkSelectPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkSelectCreatePrefab=(component
            this.tpkForm.TpkSelectCreatePrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkSelectSearchPrefab=(component
            this.tpkForm.TpkSelectSearchPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkCheckbox=(component
            this.tpkForm.TpkCheckbox changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkCheckboxPrefab=(component
            this.tpkForm.TpkCheckboxPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkRadio=(component
            this.tpkForm.TpkRadio changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkFile=(component
            this.tpkForm.TpkFile changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkDatepicker=(component
            this.tpkForm.TpkDatepicker changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkDatepickerRangePrefab=(component
            this.tpkForm.TpkDatepickerRangePrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkTimepickerPrefab=(component
            this.tpkForm.TpkTimepickerPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkPasswordPrefab=(component
            this.tpkForm.TpkPasswordPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkEmailPrefab=(component
            this.tpkForm.TpkEmailPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkIbanPrefab=(component
            this.tpkForm.TpkIbanPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkBicPrefab=(component
            this.tpkForm.TpkBicPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkVatPrefab=(component
            this.tpkForm.TpkVatPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkNationalNumberPrefab=(component
            this.tpkForm.TpkNationalNumberPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkCurrencyPrefab=(component
            this.tpkForm.TpkCurrencyPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkIntegerPrefab=(component
            this.tpkForm.TpkIntegerPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkNumberPrefab=(component
            this.tpkForm.TpkNumberPrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          TpkMobilePrefab=(component
            this.tpkForm.TpkMobilePrefab changeset=@changeset disabled=@disabled requiredFields=this.requiredFields
          )
          changesetGet=this.changesetGet
          requiredFields=this.requiredFields
        )
      }}
    </form>
  </template>
}
