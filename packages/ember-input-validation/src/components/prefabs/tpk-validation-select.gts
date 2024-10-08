import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import TpkValidationSelectComponent, { type TpkValidationSelectComponentSignature } from "../../components/tpk-validation-select.gts";
import { assert } from "@ember/debug";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';

export interface TpkValidationSelectPrefabSignature extends BaseValidationSignature {
  Args: Omit<
    TpkValidationSelectComponentSignature['Args'],
    'searchEnabled' | 'searchField' | 'searchPlaceholder' | 'searchMessage' | 'noMatchesMessage' | 'search'
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class TpkValidationSelectPrefab extends BaseValidationComponent<TpkValidationSelectPrefabSignature> {
  get options() {
    assert("options must be an array of objects", Array.isArray(this.args.options));
    return this.args.options;
  }

  toString = (v: unknown) => {
    return String(v).toString();
  };

  <template>
    <div
      class="{{if @disabled "disabled"}} tpk-validation-select"
      data-has-error='{{this.hasError}}'
    >
      <TpkValidationSelectComponent
        @label={{@label}}
        @multiple={{@multiple}}
        @disabled={{@disabled}}
        @placeholder={{@placeholder}}
        @initiallyOpened={{@initiallyOpened}}
        @allowClear={{@allowClear}}
        @classless={{@classless}}
        @selected={{this.value}}
        @options={{this.options}}
        @onChange={{@onChange}}
        @changeset={{@changeset}}
        @labelComponent={{@labelComponent}}
        @selectedItemComponent={{@selectedItemComponent}}
        @placeholderComponent={{@placeholderComponent}}
        @validationField={{@validationField}}
        ...attributes
      as |S|>
        <S.Option as |O|>
          {{this.toString O.option}}
        </S.Option>
      </TpkValidationSelectComponent>
      <TpkValidationErrorsComponent
        @errors={{this.errors}}
        @classless={{@classless}}
      />
    </div>
  </template>
}
