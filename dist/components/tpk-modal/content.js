import { _ as _defineProperty } from '../../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import tpkFocusTrap from '@triptyk/ember-input/modifiers/focus-trap';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkModalContentComponent;
class TpkModalContentComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _defineProperty(this, "guid", guidFor(this));
    assert('UiModalContent requires a @title', args.title);
  }
}
_TpkModalContentComponent = TpkModalContentComponent;
setComponentTemplate(precompileTemplate("\n    <div class=\"tpk-modal-content\">\n    <h2 class=\"tpk-modal-title\">\n        {{@title}}\n    </h2>\n    <div data-test-tpk-modal role=\"dialog\" {{tpkFocusTrap options=(hash allowOutsideClick=@outsideClickHandler)}} ...attributes>\n      \n      {{yield (hash guid=this.guid)}}\n    </div>\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    tpkFocusTrap,
    hash
  })
}), _TpkModalContentComponent);

export { TpkModalContentComponent as default };
//# sourceMappingURL=content.js.map
