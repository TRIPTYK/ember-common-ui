import type Owner from '@ember/owner';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type { Promisable } from 'type-fest';
import { assert } from '@ember/debug';
import { task, type TaskForAsyncTaskFunction } from 'ember-concurrency';
import { ImmerChangeset, isChangeset } from 'ember-immer-changeset';
import { Schema } from 'yup';
import { isFieldError } from '../utils/is-field-error.ts';
import {
  validateAndMapErrors,
  validateOneAndMapErrors,
} from '../utils/validate-and-map.ts';
import { on } from '@ember/modifier';
// @ts-expect-error - ember-concurrency does not have types for perform
import perform from 'ember-concurrency/helpers/perform';
import { hash } from '@ember/helper';
import type { WithBoundArgs } from '@glint/template';
import TpkValidationInputComponent from '../components/tpk-validation-input.gts';
import TpkValidationTextareaComponent from '../components/tpk-validation-textarea.gts';
import TpkValidationSelect from '../components/tpk-validation-select.gts';
import TpkValidationFileComponent from '../components/tpk-validation-file.gts';
import TpkValidationRadioComponent from '../components/tpk-validation-radio.gts';
import TpkValidationCheckboxComponent from '../components/tpk-validation-checkbox.gts';
import TpkValidationDatepickerComponent from '../components/tpk-validation-datepicker.gts';
import TpkFormService from '../services/tpk-form.ts';
import TpkButtonComponent from '@triptyk/ember-input/components/tpk-button';

interface ChangesetFormComponentArgs<T extends ImmerChangeset> {
  changeset: T;
  onSubmit: (changeset: T) => Promisable<unknown>;
  validationSchema: Schema;
  reactive?: boolean;
  removeErrorsOnSubmit?: boolean;
  disabled?: boolean;
  executeOnValid?: boolean;
}

export interface ChangesetFormComponentSignature {
  Args: ChangesetFormComponentArgs<ImmerChangeset>;
  Blocks: {
    default: [
      {
        TpkInput: WithBoundArgs<
          typeof TpkValidationInputComponent,
          'changeset' | 'disabled'
        >;
        TpkTextarea: WithBoundArgs<
          typeof TpkValidationTextareaComponent,
          'changeset' | 'disabled'
        >;
        TpkSelect: WithBoundArgs<
          typeof TpkValidationSelect,
          'changeset' | 'disabled'
        >;
        TpkCheckbox: WithBoundArgs<
          typeof TpkValidationCheckboxComponent,
          'changeset' | 'disabled'
        >;
        TpkRadio: WithBoundArgs<
          typeof TpkValidationRadioComponent,
          'changeset' | 'disabled'
        >;
        TpkFile: WithBoundArgs<
          typeof TpkValidationFileComponent,
          'changeset' | 'disabled'
        >;
        TpkDatePicker: WithBoundArgs<
          typeof TpkValidationDatepickerComponent,
          'changeset' | 'disabled'
        >;
        changesetGet: (path: string) => unknown;
      },
    ];
  };
  Element: HTMLFormElement;
}

export default class ChangesetFormComponent extends Component<ChangesetFormComponentSignature> {
  @service declare tpkForm: TpkFormService;

  public constructor(
    owner: Owner,
    args: ChangesetFormComponentArgs<ImmerChangeset>,
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

  <template>
    <form {{on 'submit' (perform this.submit)}} ...attributes>
      {{log this.tpkForm.TpkInput}}
      {{yield
        (hash
          TpkInput=(component
            this.tpkForm.TpkInput changeset=@changeset disabled=@disabled
          )
          TpkTextarea=(component
            this.tpkForm.TpkTextarea changeset=@changeset disabled=@disabled
          )
          TpkSelect=(component
            this.tpkForm.TpkSelect changeset=@changeset disabled=@disabled
          )
          TpkCheckbox=(component
            this.tpkForm.TpkCheckbox changeset=@changeset disabled=@disabled
          )
          TpkRadio=(component
            this.tpkForm.TpkRadio changeset=@changeset disabled=@disabled
          )
          TpkFile=(component
            this.tpkForm.TpkFile changeset=@changeset disabled=@disabled
          )
          TpkDatePicker=(component
            this.tpkForm.TpkDatePicker changeset=@changeset disabled=@disabled
          )
          changesetGet=this.changesetGet
        )
      }}
    </form>
  </template>
}
