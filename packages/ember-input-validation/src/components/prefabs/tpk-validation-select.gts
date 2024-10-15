import { type BaseValidationSignature } from "../base.ts";
import TpkValidationSelectComponent, { type TpkValidationSelectComponentSignature } from "../../components/tpk-validation-select.gts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import { assert } from "@ember/debug";
import Component from "@glimmer/component";

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

export default class TpkValidationSelectPrefabComponent extends Component<TpkValidationSelectPrefabSignature> {
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
    <TpkValidationSelectComponent
      @label={{@label}}
      @multiple={{@multiple}}
      @disabled={{@disabled}}
      @placeholder={{@placeholder}}
      @initiallyOpened={{@initiallyOpened}}
      @allowClear={{@allowClear}}
      @classless={{@classless}}
      @options={{@options}}
      @onChange={{@onChange}}
      @changeset={{@changeset}}
      @mandatory={{@mandatory}}
      @labelComponent={{@labelComponent}}
      @selectedItemComponent={{@selectedItemComponent}}
      @placeholderComponent={{@placeholderComponent}}
      @validationField={{@validationField}}
      ...attributes
    as |S|>
      <S.Option as |O|>
        {{this.toString O.option}}
      </S.Option>
      <TpkValidationErrorsComponent
        @errors={{S.errors}}
        @classless={{@classless}}
      />
    </TpkValidationSelectComponent>
  </template>
}
