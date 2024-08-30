import type { BaseValidationSignature } from "../base";
import Component from "@glimmer/component";
import TpkValidationSelectComponent, { type TpkValidationSelectComponentSignature } from "../../components/tpk-validation-select.gts";
import { tracked } from "@glimmer/tracking";
import { assert } from "@ember/debug";

export interface TpkValidationSelectPrefabSignature extends BaseValidationSignature {
  Args: Omit<TpkValidationSelectComponentSignature['Args'], 'classless' | 'selected'> & {
    placeholder?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationSelectPrefab extends Component<TpkValidationSelectPrefabSignature> {
  @tracked label = "";

  get options() {
    assert("options must be an array of objects", Array.isArray(this.args.options));
    return this.args.options;
  }

  get selectedAsText() {
    return this.toString(
      this.selected
    );
  }

  get selected() {
    return this.args.changeset.get(this.args.validationField);
  }

  toString = (v: unknown) => {
    return String(v).toString();
  };

  <template>
    <TpkValidationSelectComponent
      @label={{@label}}
      @selected={{this.selected}}
      @options={{this.options}}
      @onChange={{@onChange}}
      @changeset={{@changeset}}
      @validationField={{@validationField}}
      ...attributes
    as |S|>
      <S.Label />
      <div class="tpk-validation-select-input-container">
        <S.Button>
          {{#if this.selected}}
            {{this.selectedAsText}}
            <S.ResetButton>
              x
            </S.ResetButton>
          {{else}}
            {{@placeholder}}
          {{/if}}
        </S.Button>
      </div>
      <S.Options as |Option|>
        <Option as |v|>
          {{this.toString v.option}}
        </Option>
      </S.Options>
    </TpkValidationSelectComponent>
  </template>
}
