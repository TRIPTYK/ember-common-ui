import type { MergeDeep } from 'type-fest';
import type { BaseUIArgs } from '../base';
import TpkCheckbox from '../tpk-checkbox.gts';
import type { TOC } from '@ember/component/template-only';

export type TpkTogglePrefabSignature = {
  Args: MergeDeep<
    BaseUIArgs['Args'],
    {
      checked?: boolean;
      disabled?: boolean;
      onChange?: (isChecked: boolean, value: string, e: Event) => unknown;
    }
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
};

const TpkTogglePrefab: TOC<TpkTogglePrefabSignature> = <template>
  <TpkCheckbox
    @disabled={{@disabled}}
    @checked={{@checked}}
    @label={{@label}}
    @onChange={{@onChange}}
    as |C|
  >
    <div
      class='tpk-toggle-container'
      data-test-tpk-prefab-toggle-container
      ...attributes
    >
      <C.Label class='tpk-toggle-label-container'>
        <span class='tpk-toggle-label'>{{@label}}</span>
        <C.Input class='tpk-toggle-input' />
      </C.Label>
    </div>
  </TpkCheckbox>
</template>;

export default TpkTogglePrefab;
