import { type BaseValidationSignature } from '../base.ts';
import TpkValidationRadioComponent, {
  type TpkValidationRadioComponentSignature,
} from '../tpk-validation-radio.gts';
import type { TOC } from '@ember/component/template-only';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';

export interface TpkValidationRadioPrefabComponentSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] &
    TpkValidationRadioComponentSignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const TpkValidationRadioPrefabComponent: TOC<TpkValidationRadioPrefabComponentSignature> =
  <template>
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
      as |V|
    >
      <div
        class='tpk-radio-container'
        data-test-tpk-prefab-radio-container
        anchorScrollUp={{@validationField}}
        ...attributes
      >
        <V.Label class='tpk-radio-label'>
          <span>{{@label}}</span>
          <V.Input class='tpk-radio-input' />
        </V.Label>
        <TpkValidationErrorsComponent
          class='tpk-validation-errors'
          @errors={{V.errors}}
        />
      </div>
    </TpkValidationRadioComponent>
  </template>;

export default TpkValidationRadioPrefabComponent;
