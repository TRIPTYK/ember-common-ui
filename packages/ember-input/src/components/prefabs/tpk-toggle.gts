import type { MergeDeep } from 'type-fest';
import type { BaseUIComponentArgs } from '../base';
import TpkCheckboxComponent from '../tpk-checkbox.gts';
import type { TOC } from '@ember/component/template-only';

export type TpkCheckboxPrefabSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
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

const TpkCheckboxPrefabComponent: TOC<TpkCheckboxPrefabSignature> = <template>
  <TpkCheckboxComponent @disabled={{@disabled}} @checked={{@checked}} @label={{@label}} @onChange={{@onChange}} as |C|>
    <div class="tpk-toggle-container" data-test-tpk-prefab-toggle-container ...attributes>
      <C.Label class="tpk-toggle-label-container">
        <span class="tpk-toggle-label">{{@label}}</span>
        <C.Input class="tpk-toggle-input" />
      </C.Label>
    </div>
  </TpkCheckboxComponent>
</template>

export default TpkCheckboxPrefabComponent;
