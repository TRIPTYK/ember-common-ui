import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { BaseUIComponent } from './base.js';
import TpkFileInputComponent from './tpk-file/input.js';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _descriptor, _TpkFileComponent;
let TpkFileComponent = (_class = (_TpkFileComponent = class TpkFileComponent extends BaseUIComponent {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "files", _descriptor, this);
  }
  onChange(e) {
    e.preventDefault();
    const target = e.target;
    const files = Array.from(target.files ?? []);
    this.files = files;
    this.args.onChange?.(files, e);
  }
}, setComponentTemplate(precompileTemplate("\n    {{yield (hash Input=(component TpkFileInputComponent onChange=this.onChange accept=@accept disabled=@disabled multiple=@multiple changeEvent=this.changeEvent guid=this.guid) Label=(component TpkLabel label=@label onChange=this.onChange guid=this.guid) changeEvent=this.changeEvent onChange=this.onChange guid=this.guid files=this.files)}}\n  ", {
  strictMode: true,
  scope: () => ({
    hash,
    TpkFileInputComponent,
    TpkLabel
  })
}), _TpkFileComponent), _TpkFileComponent), _descriptor = _applyDecoratedDescriptor(_class.prototype, "files", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkFileComponent as default };
//# sourceMappingURL=tpk-file.js.map
