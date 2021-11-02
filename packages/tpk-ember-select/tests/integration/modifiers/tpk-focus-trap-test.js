import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | tpk-focus-trap', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function (assert) {
    const contentFocus = "I'm focus";
    const clickOutside = (e) => {
      for (let i = 0; i < e.path?.length; i++) {
        if (e.path[i] === this.buttonElement) {
          return true;
        }
      }
      this.closeOptions();
      return true;
    };
    this.set('clickOutside', clickOutside);
    this.set('contentFocus', contentFocus);

    await render(
      hbs`
      <div {{tpk-focus-trap focusTrapOtions=(hash allowOutsideClick=this.clickOutside)}}>
        <label for="trappable">Focus trap</label>
        <input type="text" id="trappable" value={{this.contentFocus}} />
      </div>`
    );

    assert.ok(true);
  });
});
