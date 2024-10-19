import { action } from "@ember/object";
import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { assert } from "@ember/debug";
import TpkSelectComponent, { type TpkSelectSignature } from "@triptyk/ember-input/components/tpk-select";

export interface TpkValidationSelectPrefabSignature extends BaseValidationSignature {
  Args: Omit<
    BaseValidationSignature['Args'] & TpkSelectSignature['Args'],
    'searchField' | 'searchPlaceholder' | 'searchMessage' | 'noMatchesMessage' | 'search'
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelectPrefabComponent extends BaseValidationComponent<TpkValidationSelectPrefabSignature> {
  constructor(
    owner: unknown,
    args: TpkValidationSelectPrefabSignature['Args'],
  ) {
    super(owner, args);
    assert(
      'If you want use search, please use TpkValidationSelectSearchPrefab',
      typeof args.searchEnabled === 'undefined',
    );
  }

  @action
  onChange(value: unknown) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    return this.args.changeset.set(this.args.validationField, value);
  }

  get label() {
    return this.mandatory ? `${this.args.label} *` : this.args.label;
  }

  toString = (v: unknown) => {
    return String(v).toString();
  };

  <template>
    <div
      class="{{if @disabled "disabled"}} tpk-validation-select"
      data-has-error='{{this.hasError}}'
    >
      <TpkSelectComponent
        @label={{@label}}
        @multiple={{@multiple}}
        @disabled={{@disabled}}
        @placeholder={{@placeholder}}
        @initiallyOpened={{@initiallyOpened}}
        @allowClear={{@allowClear}}
        @classless={{@classless}}
        @options={{@options}}
        @onChange={{this.onChange}}
        @selected={{this.value}}
        @labelComponent={{@labelComponent}}
        @selectedItemComponent={{@selectedItemComponent}}
        @placeholderComponent={{@placeholderComponent}}
        anchorScrollUp={{@validationField}}
        ...attributes
      as |S|>
        <S.Option as |O|>
          {{this.toString O.option}}
        </S.Option>
      </TpkSelectComponent>
      <TpkValidationErrorsComponent
        @errors={{this.errors}}
        @classless={{@classless}}
      />
    </div>
  </template>
}
