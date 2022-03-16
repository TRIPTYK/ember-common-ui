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
    <div id="other"></div>
    <Ui::Modal
      @isOpen={{this.isOpen}}
      @title={{this.title}}
      @onClose={{this.onClose}}
      data-test-modal-toggle
    >
      Content
    </Ui::Modal>`);

    assert.dom('[data-test-modal-toggle]').doesNotExist();

    this.set('isOpen', true);

    assert.dom('[data-test-modal-toggle]').exists();
    assert.dom('.tpk-modal-container').exists();
    assert.dom('.tpk-modal-container > .tpk-modal-cover').exists();
    assert.dom('.tpk-modal-container > .tpk-modal-content').exists();
    assert
      .dom(
        '.tpk-modal-container > .tpk-modal-content > .tpk-modal-content-head'
      )
      .exists();
    assert
      .dom(
        '.tpk-modal-container > .tpk-modal-content > .tpk-modal-content-head > .tpk-modal-content-head-button'
      )
      .exists();
    assert
      .dom('[data-test-modal-toggle] h3')
      .hasText(this.get('title') as string);

    await triggerKeyEvent(document, 'keydown', 'Escape');
    assert.dom('[data-test-modal-toggle]').doesNotExist();
    assert.false(this.get('isOpen'));

    this.set('isOpen', true);
    assert.dom('[data-test-modal-toggle]').exists();

    await click('[data-test-tpk-modal-close]');
    assert.dom('[data-test-modal-toggle]').doesNotExist();
    assert.false(this.get('isOpen'));
  });
});
