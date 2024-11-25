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
  Element: HTMLDivElement;
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
      <div class="tpk-input" data-test-tpk-input data-has-error='{{V.hasError}}' anchorScrollUp={{@validationField}} ...attributes>
        <V.Label>
          <MandatoryLabelComponent @label={{@label}} @mandatory={{V.mandatory}} />
        </V.Label>
        <V.Input />
        <TpkValidationErrorsComponent
          @errors={{V.errors}}

        />
      </div>
    </TpkValidationInputComponent>
  </template>;

export default TpkValidationEmailPrefabComponent;
