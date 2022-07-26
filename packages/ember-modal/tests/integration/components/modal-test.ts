/* eslint-disable ember/no-get */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | modal', function (hooks) {
  setupRenderingTest(hooks);

  test('default modal behavior', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('onClose', () => {
      this.set('isOpen', false);
    });
    this.set('isOpen', false);
    this.set('title', 'My modal');

    await render(hbs`
    <div id="tpk-modal"></div>
    <div id="other"></div>
    <TpkModal
      @isOpen={{this.isOpen}}
      @title={{this.title}}
      @onClose={{this.onClose}}
      data-test-modal-toggle
    as |Modal|>
      <Modal.Content>
        <button type="button">Content</button>
      </Modal.Content>
    </TpkModal>`);

    assert.dom('[data-test-modal-toggle]').doesNotExist();

    this.set('isOpen', true);

    assert.dom('[data-test-modal-toggle]').exists();
    assert.dom('.tpk-modal').exists();
    assert.dom('.tpk-modal > .tpk-modal-content').exists();

    await triggerKeyEvent(this.element, 'keyup', 'Escape');
    assert.dom('[data-test-modal-toggle]').doesNotExist();
    assert.false(this.get('isOpen'), 'Esc closes modal');

    this.set('isOpen', true);

    await click(this.element);
    assert.dom('[data-test-modal-toggle]').doesNotExist();
    assert.false(this.get('isOpen'), 'Click outside closes modal');
  });
});
