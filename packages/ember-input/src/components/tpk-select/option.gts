import { hash } from '@ember/helper';
import type { TOC } from '@ember/component/template-only';

export interface TpkSelectOptionArgs {
  Args: {
    option: unknown;
  };
  Element: HTMLLIElement;
  Blocks: {
    default: [{ option: unknown }];
  };
}

const TpkSelectOption:TOC<TpkSelectOptionArgs> =
  <template>
    {{yield (hash option=@option)}}
  </template>

export default TpkSelectOption;
