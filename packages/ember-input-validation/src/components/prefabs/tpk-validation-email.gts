import TpkValidationInputComponent, {
  type TpkValidationInputComponentSignature,
} from '../tpk-validation-input.gts';
import {
  type BaseValidationSignature
} from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from './mandatory-label.gts';
import { type TOC } from '@ember/component/template-only';

export interface TpkValidationEmailComponentSignature
  extends BaseValidationSignature {
  Args: Omit<
    TpkValidationInputComponentSignature['Args'],
    | 'type'
    | 'min'
    | 'max'
    | 'step'
    | 'mask'
    | 'unmaskValue'
    | 'maskOptions'
    | 'mask'
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const TpkValidationEmailPrefabComponent: TOC<TpkValidationEmailComponentSignature> = <template>
    <TpkValidationInputComponent
      @type='email'
      @label={{@label}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @mandatory={{@mandatory}}
      @placeholder={{@placeholder}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @requiredFields={{@requiredFields}}
      as |V|
    >
        <V.Label 
        class="tpk-email-container" 
        data-test-tpk-email data-has-error='{{V.hasError}}' 
        anchorScrollUp={{@validationField}} 
        ...attributes>
          <MandatoryLabelComponent 
          class="tpk-label" 
          @label={{@label}} 
          @mandatory={{V.mandatory}} />
          <V.Input 
          class="tpk-email-input" 
          data-test-tpk-email-input />
          <TpkValidationErrorsComponent
          class="tpk-validation-errors"
          @errors={{V.errors}}
          />
         </V.Label>
    </TpkValidationInputComponent>
  </template>;

export default TpkValidationEmailPrefabComponent;
