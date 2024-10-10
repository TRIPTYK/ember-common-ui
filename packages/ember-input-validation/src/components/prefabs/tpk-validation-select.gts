import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import TpkValidationSelectComponent, { type TpkValidationSelectComponentSignature } from "../../components/tpk-validation-select.gts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { assert } from "@ember/debug";

export interface TpkValidationSelectPrefabSignature extends BaseValidationSignature {
  Args: Omit<
    TpkValidationSelectComponentSignature['Args'],
    'searchField' | 'searchPlaceholder' | 'searchMessage' | 'noMatchesMessage' | 'search'
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelectPrefab extends BaseValidationComponent<TpkValidationSelectPrefabSignature> {
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
        @options={{@options}}
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
