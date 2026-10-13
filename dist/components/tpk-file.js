import { action } from '@ember/object';
import { BaseUI } from './base.js';
import TpkFileInput from './tpk-file/input.js';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.js';
import { trackedArray } from '@ember/reactive/collections';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkFile extends BaseUI {
  files = trackedArray();
  onChange(e) {
    e.preventDefault();
    const target = e.target;
    const files = Array.from(target.files ?? []);
    this.files = files;
    this.args.onChange?.(files, e);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("{{yield (hash Input=(component TpkFileInputComponent onChange=this.onChange accept=@accept disabled=@disabled multiple=@multiple changeEvent=this.changeEvent guid=this.guid) Label=(component TpkLabel label=@label onChange=this.onChange guid=this.guid) changeEvent=this.changeEvent onChange=this.onChange guid=this.guid files=this.files)}}", {
      strictMode: true,
      scope: () => ({
        hash,
        TpkFileInputComponent: TpkFileInput,
        TpkLabel
      })
    }), this);
  }
}

export { TpkFile as default };
//# sourceMappingURL=tpk-file.js.map
