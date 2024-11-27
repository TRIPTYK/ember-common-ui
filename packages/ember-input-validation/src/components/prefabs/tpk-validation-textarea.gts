import TpkValidationTextareaComponent, { type TpkValidationTextareaComponentSignature } from "../tpk-validation-textarea.gts";
import { type BaseValidationSignature } from "../base.ts";
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from "./mandatory-label.gts";
import { type TOC } from '@ember/component/template-only';

export interface TpkValidationTextareaPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] & TpkValidationTextareaComponentSignature['Args'] & { mandatory: boolean };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const TpkValidationTextareaPrefabComponent: TOC<TpkValidationTextareaPrefabSignature> = <template>
    <TpkValidationTextareaComponent
      @label={{@label}}

      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @mandatory={{@mandatory}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @maxLength={{@maxLength}}
      @requiredFields={{@requiredFields}}
    as |V|>
      <div
        class='tpk-textarea'
        anchorScrollUp={{@validationField}}
        ...attributes
        data-test-tpk-textarea
      >
      <V.Label>
        <MandatoryLabelComponent @label={{@label}} @mandatory={{V.mandatory}} />
      </V.Label>
      <V.Input />
      {{#if @maxLength}}
        <span class="count">
          {{V.charCount}} / {{@maxLength}}
        </span>
      {{/if}}
      <TpkValidationErrorsComponent
        @errors={{V.errors}}

      />
      </div>
    </TpkValidationTextareaComponent>
  </template>;

export default TpkValidationTextareaPrefabComponent;
