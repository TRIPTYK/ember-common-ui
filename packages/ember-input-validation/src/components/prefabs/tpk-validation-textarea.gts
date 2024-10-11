import TpkValidationTextareaComponent, { type TpkValidationTextareaComponentSignature } from "../tpk-validation-textarea.gts";
import { BaseValidationComponent, type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';

export interface TpkValidationTextareaPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkValidationTextareaComponentSignature['Args'] & { mandatory: boolean };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class TpkValidationTextareaPrefab extends BaseValidationComponent<TpkValidationTextareaPrefabSignature> {
  <template>
    <TpkValidationTextareaComponent
      @label={{@label}}
      @classless={{@classless}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @maxLength={{@maxLength}}
      ...attributes
    as |V|>
      <V.Label>
        {{@label}}
        {{#if @mandatory}}
          <span>
            *
          </span>
        {{/if}}
      </V.Label>
      <V.Input />
      {{#if @maxLength}}
        <span class="count">
          {{V.charCount}} / {{@maxLength}}
        </span>
      {{/if}}
      <TpkValidationErrorsComponent
        @errors={{V.errors}}
        @classless={{@classless}}
      />
    </TpkValidationTextareaComponent>
  </template>
}
