import { TOC } from '@ember/component/template-only';

export interface TpkStepperStepperComponentSignature {
  Args: {
    classless?: boolean;
    guid: string;
  };
  Element: HTMLOListElement;
  Blocks: {
    default: [];
  };
}

const TpkStepperStepperComponent: TOC<TpkStepperStepperComponentSignature> =
  <template>
    <ol
      class={{unless @classless 'tpk-stepper-stepper'}}
      id={{@guid}}
      ...attributes
    >{{yield}}</ol>
  </template>;

export default TpkStepperStepperComponent;
