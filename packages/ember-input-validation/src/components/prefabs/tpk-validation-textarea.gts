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
  Element: HTMLElement;
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
      <V.Label
        class="tpk-textarea-container"
        data-test-tpk-prefab-textarea-container
        data-has-error='{{V.hasError}}'
        anchorScrollUp={{@validationField}}
        ...attributes
      >
        <MandatoryLabelComponent
          class="tpk-label"
          @label={{@label}}
          @mandatory={{V.mandatory}}
        />
        <V.Input
          class="tpk-textarea-input"
          data-test-tpk-textarea-input
        />
        <TpkValidationErrorsComponent
          class="tpk-validation-errors"
          @errors={{V.errors}}
        />
        {{#if @maxLength}}
          <span class="tpk-textarea-character-count">
            {{V.charCount}} / {{@maxLength}}
          </span>
        {{/if}}
      </V.Label>
    </TpkValidationTextareaComponent>
  </template>;

export default TpkValidationTextareaPrefabComponent;
