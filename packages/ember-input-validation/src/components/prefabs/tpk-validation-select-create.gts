import {
  type BaseValidationSignature,
  BaseValidationComponent,
} from '../base.ts';
import TpkSelectCreateComponent, {
  type TpkSelectCreateSignature,
} from '@triptyk/ember-input/components/tpk-select-create';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import type { Select } from '@triptyk/ember-input/components/tpk-select';
import { action } from '@ember/object';

export interface TpkValidationSelectCreatePrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] &
    TpkSelectCreateSignature['Args'] & {
      onChange?: TpkSelectCreateSignature['Args']['onChange'];
    };
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

  @action onChange(selection: unknown, select: Select, event?: Event) {
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
      anchorScrollUp={{@validationField}}
      data-test-tpk-prefab-select-create-container
      ...attributes
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
        anchorScrollUp={{@validationField}}
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
