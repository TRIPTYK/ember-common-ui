import { type BaseValidationSignature, BaseValidation } from '../base.ts';
import TpkSelectCreateComponent, {
  type TpkSelectCreateSignature,
} from '@triptyk/ember-input/components/tpk-select-create';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { action } from '@ember/object';
import type Owner from '@ember/owner';
import type { SelectType } from '@triptyk/ember-input/components/tpk-select';
import type { Merge } from 'type-fest';
import MandatorySelectLabelText from './mandatory-select-label-text.gts';

type Args = BaseValidationSignature['Args'] &
  Merge<
    TpkSelectCreateSignature['Args'],
    {
      onChange?: TpkSelectCreateSignature['Args']['onChange'];
    }
  >;

export interface TpkValidationSelectCreatePrefabSignature extends BaseValidationSignature {
  Args: Args;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelectCreatePrefab extends BaseValidation<TpkValidationSelectCreatePrefabSignature> {
  constructor(
    owner: Owner,
    args: TpkValidationSelectCreatePrefabSignature['Args'],
  ) {
    super(owner, args);
  }

  @action onChange(selection: unknown, select: SelectType, event?: Event) {
    if (this.args.onChange) {
      return this.args.onChange(selection, select, event);
    }
    return this.args.changeset.set(this.args.validationField, selection);
  }

  toString = (v: unknown) => {
    return String(v).toString();
  };

  <template>
    <div
      class='{{if @disabled "disabled"}} tpk-select-create-container'
      data-has-error='{{this.hasError}}'
      {{! @glint-expect-error }}
      anchorScrollUp={{@validationField}}
      data-test-tpk-prefab-select-create-container={{@validationField}}
      ...attributes
    >
      <TpkSelectCreateComponent
        @label={{@label}}
        @multiple={{@multiple}}
        @disabled={{@disabled}}
        @placeholder={{@placeholder}}
        @initiallyOpened={{@initiallyOpened}}
        @allowClear={{@allowClear}}
        @selected={{this.value}}
        @options={{@options}}
        @onChange={{this.onChange}}
        @onCreate={{@onCreate}}
        @labelComponent={{if
          @labelComponent
          @labelComponent
          (component MandatorySelectLabelText mandatory=this.mandatory)
        }}
        @labelClass='tpk-label'
        @selectedItemComponent={{@selectedItemComponent}}
        @placeholderComponent={{@placeholderComponent}}
        @buildSuggestion={{@buildSuggestion}}
        @showCreateWhen={{@showCreateWhen}}
        @loadingMessage={{@loadingMessage}}
        @noMatchesMessage={{@noMatchesMessage}}
        @searchEnabled={{@searchEnabled}}
        @searchField={{@searchField}}
        @searchPlaceholder={{@searchPlaceholder}}
        @searchMessage={{@searchMessage}}
        @search={{@search}}
        as |S|
      >
        <S.Option as |O|>
          {{this.toString O.option}}
        </S.Option>
      </TpkSelectCreateComponent>
      <TpkValidationErrorsComponent
        class='tpk-validation-errors'
        @errors={{this.errors}}
      />
    </div>
  </template>
}
