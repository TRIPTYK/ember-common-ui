/* eslint-disable ember/no-get */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
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
    >
      Content
    </TpkModal>`);

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

    await click('[data-test-tpk-modal-close]');
    assert.dom('[data-test-modal-toggle]').doesNotExist();
    assert.false(this.get('isOpen'));
  });

  test('click outside', async function (assert) {
    this.set('onClose', () => {
      this.set('isOpen', false);
    });
    this.set('onClickOutside', () => {
      console.log('out');
      this.set('isOpen', false);
      assert.step('clickOutside');
    });
    this.set('isOpen', false);
    this.set('title', 'My modal');

    await render(hbs`
    <div id="tpk-modal"></div>
    <button type="button" data-test-other class="absolute top-0 z-30 p-5">Banana</button>
    <TpkModal
      @isOpen={{this.isOpen}}
      @title={{this.title}}
      @onClose={{this.onClose}}
      @onClickOutside={{this.onClickOutside}}
      data-test-modal-toggle
    >
      Content
    </TpkModal>`);

    assert.dom('[data-test-modal-toggle]').doesNotExist();

    this.set('isOpen', true);

    assert.dom('[data-test-modal-toggle]').exists('modal should be open');
    /**
     * The modifier seems to take some time to listen (some ms), we must wait a little
     */
    await new Promise((res) => setTimeout(res, 50));
    await click('[data-test-other]');
    assert.verifySteps(
      ['clickOutside'],
      'clickOutside function must have been called'
    );
  });
});
