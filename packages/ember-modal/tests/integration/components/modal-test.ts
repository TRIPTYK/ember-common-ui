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
    assert.false(this.get('isOpen'));
  });

  test('click outside', async function (assert) {
    this.set('onClose', () => {
      this.set('isOpen', false);
    });
    this.set('isOpen', false);
    this.set('title', 'My modal');

    await render(hbs`
    <div id="tpk-modal"></div>

    <TpkModal
      @isOpen={{this.isOpen}}
      @title={{this.title}}
      @onClose={{this.onClose}}
      data-test-modal-toggle
    as |M|>
      <M.Content>
      Content
      <button type="button" data-test-other class="absolute top-0 z-30 p-5">Banana</button>
      </M.Content>
    </TpkModal>`);

    assert.dom('[data-test-modal-toggle]').doesNotExist();

    this.set('isOpen', true);

    assert.dom('[data-test-modal-toggle]').exists('modal should be open');
    /**
     * The modifier seems to take some time to listen (some ms), we must wait a little
     */
    await new Promise((res) => setTimeout(res, 50));
    await click('[data-test-other]');
    assert.true(
      this.get('isOpen'),
      'Modal should stay opened even with absolute element'
    );
  });
});
