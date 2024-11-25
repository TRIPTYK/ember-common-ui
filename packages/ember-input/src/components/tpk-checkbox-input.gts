import { on } from '@ember/modifier';
import type { TOC } from '@ember/component/template-only';

export interface TpkCheckboxInputComponentSignature {
  Args: {
    guid: string;
    value?: string;
    checked?: boolean;
    disabled?: boolean;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLInputElement;
}

const TpkCheckboxInputComponent: TOC<TpkCheckboxInputComponentSignature> = <template>
  <input
    id={{@guid}}
    checked={{@checked}}
    disabled={{@disabled}}
    type='checkbox'
    {{on @changeEvent @onChange}}
    ...attributes
    data-test-tpk-checkbox-input
  />
</template>;

export default TpkCheckboxInputComponent;
