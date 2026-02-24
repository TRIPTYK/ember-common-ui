import TpkButtonComponent from '../tpk-button.gts';
import type { TOC } from '@ember/component/template-only';

export type TpkButtonPrefabSignature = {
  Args: {
    disabled?: boolean;
    label: string;
    onClick: (e: Event) => void | Promise<void>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
};

const TpkButtonPrefabComponent: TOC<TpkButtonPrefabSignature> = <template>
  <TpkButtonComponent
    @label={{@label}}
    @disabled={{@disabled}}
    @onClick={{@onClick}}
    class='tpk-button-container'
    data-test-tpk-prefab-button-container
    ...attributes
  >
    {{@label}}
  </TpkButtonComponent>
</template>;

export default TpkButtonPrefabComponent;
