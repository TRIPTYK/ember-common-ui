import type { TOC } from '@ember/component/template-only';
export interface TpkStepperStepperComponentSignature {
  Args: {

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
      class='tpk-stepper-stepper'
      id={{@guid}}
      ...attributes
    >{{yield}}</ol>
  </template>;

export default TpkStepperStepperComponent;
