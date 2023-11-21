import type { TOC } from '@ember/component/template-only';
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

// eslint-disable-next-line prettier/prettier
const TpkStepperStepperComponent: TOC<TpkStepperStepperComponentSignature> =
  <template>
    <ol
      class={{unless @classless 'tpk-stepper-stepper'}}
      id={{@guid}}
      ...attributes
    >{{yield}}</ol>
  </template>;

export default TpkStepperStepperComponent;
