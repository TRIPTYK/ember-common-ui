
import { type BaseValidationSignature } from '../base.ts';
import TpkValidationRadioComponent, { type TpkValidationRadioComponentSignature } from '../tpk-validation-radio.gts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import type { TOC } from '@ember/component/template-only';

export interface TpkValidationRadioPrefabComponentSignature
  extends BaseValidationSignature{
  Args: BaseValidationSignature['Args'] & TpkValidationRadioComponentSignature['Args'] & {
    hasOnGroup: boolean;
  }
  Blocks:{
    default: [];
  };
  element: HTMLDivElement
}

const TpkValidationRadioPrefabComponent: TOC<TpkValidationRadioPrefabComponentSignature> = <template>
  <TpkValidationRadioComponent
      @value={{@value}}
      @selected={{@selected}}
      @label={{@label}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @classless={{@classless}}
      @changeEvent={{@changeEvent}}
      @disabled={{@disabled}}
      @onChange={{@onChange}}
      @requiredFields={{@requiredFields}}
    ...attributes
  as |V|>
  
    <V.Label @label={{@label}}/>
    <V.Input />
    {{#unless @hasOnGroup}}
      <TpkValidationErrorsComponent
        @errors={{V.errors}}
        @classless={{@classless}}
      />
    {{/unless}}
  </TpkValidationRadioComponent>
</template>

export default TpkValidationRadioPrefabComponent;