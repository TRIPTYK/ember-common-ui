import { type TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';

export interface TpkInputInputComponentSignature {
  Args: {
    guid: string;
    type?: string;
    classless?: boolean;
    placeholder?: string;
    disabled?: boolean;
    min?: number;
    step?: number;
    max?: number;
    value?: string | number | boolean | null | undefined;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLInputElement;
  Blocks: {
    default: unknown[];
  };
}

const TpkInputInputComponent: TOC<TpkInputInputComponentSignature> = <template>
  <input
    class={{unless @classless 'tpk-input-input'}}
    id={{@guid}}
    min={{@min}}
    step={{@step}}
    max={{@max}}
    type={{@type}}
    value={{@value}}
    disabled={{@disabled}}
    placeholder={{@placeholder}}
    {{on @changeEvent @onChange}}
    ...attributes
    data-test-tpk-input-input
  />
</template>;

export default TpkInputInputComponent;
