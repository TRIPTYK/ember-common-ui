import { hash } from '@ember/helper';
import type { TOC } from '@ember/component/template-only';

export interface TpkSelectOptionArgs {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    option: any;
  };
  Element: HTMLLIElement;
  Blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: [{ option: any }];
  };
}

const TpkSelectOption: TOC<TpkSelectOptionArgs> = <template>
  {{yield (hash option=@option)}}
</template>;

export default TpkSelectOption;
