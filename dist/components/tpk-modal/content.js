import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import tpkFocusTrap from '@triptyk/ember-input/modifiers/focus-trap';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkModalContentComponent extends Component {
  guid = guidFor(this);
  constructor(owner, args) {
    super(owner, args);
    assert('UiModalContent requires a @title', args.title);
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"tpk-modal-content\">\n  <h2 class=\"tpk-modal-title\">\n    {{@title}}\n  </h2>\n  <div data-test-tpk-modal role=\"dialog\" {{tpkFocusTrap options=(hash allowOutsideClick=@outsideClickHandler)}} ...attributes>\n\n    {{yield (hash guid=this.guid)}}\n  </div>\n</div>", {
      strictMode: true,
      scope: () => ({
        tpkFocusTrap,
        hash
      })
    }), this);
  }
}

export { TpkModalContentComponent as default };
//# sourceMappingURL=content.js.map
