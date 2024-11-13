import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkSelectCreateComponent, { type TpkSelectCreateSignature } from '@triptyk/ember-input/components/tpk-select-create';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { action } from '@ember/object';

export interface TpkValidationSelectCreatePrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkSelectCreateSignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelectCreatePrefabComponent extends BaseValidationComponent<TpkValidationSelectCreatePrefabSignature> {
  constructor(
    owner: unknown,
    args: TpkValidationSelectCreatePrefabSignature['Args'],
  ) {
    super(owner, args);
  }

  get label() {
    return this.mandatory ? `${this.args.label} *` : this.args.label;
  }

  @action onChange(value: unknown) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }

  toString = (v: unknown) => {
    return String(v).toString();
  };

  <template>
    <div
      class="{{if @disabled "disabled"}} tpk-validation-select-search"
      data-has-error='{{this.hasError}}'
    >
      <TpkSelectCreateComponent
        @label={{this.label}}
        @multiple={{@multiple}}
        @disabled={{@disabled}}
        @placeholder={{@placeholder}}
        @initiallyOpened={{@initiallyOpened}}
        @allowClear={{@allowClear}}

        @selected={{this.value}}
        @options={{@options}}
        @onChange={{this.onChange}}
        @onCreate={{@onCreate}}
        @labelComponent={{@labelComponent}}
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
        anchorScrollUp={{@validationField}}
        ...attributes
        as |S|
      >
        <S.Option as |O|>
          {{this.toString O.option}}
        </S.Option>
      </TpkSelectCreateComponent>
      <TpkValidationErrorsComponent
        @errors={{this.errors}}

      />
    </div>
  </template>
}
