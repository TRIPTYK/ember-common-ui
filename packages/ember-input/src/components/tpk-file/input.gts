import { type TOC } from '@ember/component/template-only';
import { on } from '@ember/modifier';

export interface TpkFileInputComponentSignature {
  Args: {
    guid: string;

    accept?: string;
    disabled?: boolean;
    multiple?: boolean;
    changeEvent: 'input' | 'change';
    onChange: (event: Event) => void;
  };
  Element: HTMLInputElement;
}

const TpkFileInputComponent: TOC<TpkFileInputComponentSignature> = <template>
  <input
    class='tpk-file-input'
    id={{@guid}}
    multiple={{@multiple}}
    {{on @changeEvent @onChange}}
    accept={{@accept}}
    disabled={{@disabled}}
    type='file'
    ...attributes
    data-test-tpk-file-input
  />
</template>;

export default TpkFileInputComponent;
