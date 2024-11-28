import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  click, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationPassword from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-password';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';



module(
  'Integration | Component | Prefabs | tpk-validation-password',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent({
      disabled = false
    }: {
      disabled?: boolean
    }) {
      const changeset = new ImmerChangeset({
        name: 'value',
      });

      await render(
        <template>
          <TpkValidationPassword
          class="custom-class"
          @disabled={{disabled}}
          @changeset={{changeset}}
          @validationField="name" />
        </template>
      );

      return changeset;
    }

    test('Should have a toggle button when @disabled=false', async function (assert) {
      await renderComponent({
        disabled: false
      });
      assert
        .dom('[data-test-tpk-password-toggle-button]')
        .hasClass('tpk-password-toggle-button');
    });

    test('Should not have a toggle button when @disabled=true', async function (assert) {
      await renderComponent({
        disabled: true
      });
      assert.dom('[data-test-tpk-password-toggle-button]').doesNotExist();
    });

    test('Should have an eye image', async function (assert) {
      await renderComponent({
        disabled: false
      });
      assert
        .dom('[data-test-tpk-password-toggle-button]')
        .hasClass('tpk-password-toggle-button');
      assert
        .dom('[data-test-tpk-password-toggle-icon]')
        .hasAttribute('src', '/assets/icons/eye.svg');
    });

    test('Input type should be password', async function (assert) {
      await renderComponent({
        disabled: false
      });
      assert.dom('input').hasAttribute('type', 'password');
    });

    test('When button is clicked, input type should be text', async function (assert) {
      await renderComponent({
        disabled: false
      });
      await click('[data-test-tpk-password-toggle-button]');

      assert.dom('input').hasAttribute('type', 'text');
    });

    test('When button is clicked, eye icon should be eye-shut', async function (assert) {
      await renderComponent({
        disabled: false
      });
      await click('[data-test-tpk-password-toggle-button]');

      assert
        .dom('[data-test-tpk-password-toggle-button] img')
        .hasAttribute('src', '/assets/icons/eye-shut.svg');
    });

    test('When button is clicked twice, input type should be password', async function (assert) {
      await renderComponent({
        disabled: false
      });
      await click('[data-test-tpk-password-toggle-button]');

      await click('[data-test-tpk-password-toggle-button]');

      assert.dom('input').hasAttribute('type', 'password');
    });

    test('Attributes should be passed to the container', async function (assert) {
      await renderComponent({
        disabled: false
      });
      assert.dom('[data-test-tpk-prefab-password-container]').hasClass('custom-class');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await renderComponent({
        disabled: false
      });
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'name',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });

    test('@disabled disables the input', async function(assert) {
      await renderComponent({
        disabled: true
      });
      assert.dom(`[data-test-tpk-password-input]`).hasAttribute('disabled');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      await renderComponent({
        disabled: false
      });
      assertTpkCssClassesExist(assert, 'password');
    });
  },
);
