/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import {
  type TestContext,
  fillIn,
  click,
  findAll,
  render,
  settled,
} from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

module(
  'Integration | Component | Prefabs | tpk-validation-password',
  function (hooks) {
    setupRenderingTest(hooks);

    async function renderComponent(this: TestContext) {
      const changeset = new ImmerChangeset({
        name: 'value',
      });

      this.set('changeset', changeset);

      await render(
        hbs`<Prefabs::TpkValidationPassword class="custom-class"  @changeset={{this.changeset}} @validationField="name" />`,
      );
    }

    test('Should have a toggle button', async function (assert) {
      await renderComponent.call(this);
      assert
        .dom('[data-test-toggle-button]')
        .hasClass('tpk-input-validation-toggle-button');
    });

    test('Should have an eye image', async function (assert) {
      await renderComponent.call(this);
      assert
        .dom('[data-test-toggle-button] img')
        .hasClass('tpk-input-validation-toggle-button-image');
      assert
        .dom('[data-test-toggle-button] img')
        .hasAttribute('src', '/assets/icons/eye.svg');
    });

    test('Input type should be password', async function (assert) {
      await renderComponent.call(this);
      assert.dom('input').hasAttribute('type', 'password');
    });

    test('When button is clicked, input type should be text', async function (assert) {
      await renderComponent.call(this);
      await click('[data-test-toggle-button]');

      assert.dom('input').hasAttribute('type', 'text');
    });

    test('When button is clicked, eye icon should be eye-shut', async function (assert) {
      await renderComponent.call(this);
      await click('[data-test-toggle-button]');

      assert
        .dom('[data-test-toggle-button] img')
        .hasAttribute('src', '/assets/icons/eye-shut.svg');
    });

    test('When button is clicked twice, input type should be password', async function (assert) {
      await renderComponent.call(this);
      await click('[data-test-toggle-button]');

      await click('[data-test-toggle-button]');

      assert.dom('input').hasAttribute('type', 'password');
    });

    test('Attributes should be passed to the input', async function (assert) {
      await renderComponent.call(this);
      assert.dom('.tpk-input').hasClass('custom-class');
    });
  },
);
