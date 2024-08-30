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
  'Integration | Component | Prefabs | tpk-validation-currency',
  function (hooks) {
    setupRenderingTest(hooks);

    async function renderComponent(this: TestContext, scale: number = 2) {
      const changeset = new ImmerChangeset({
        value: 123.56,
      });

      this.set('changeset', changeset);
      this.set('scale', scale);

      await render(
        hbs`<Prefabs::TpkValidationCurrency class="custom-class"  @changeset={{this.changeset}} @onChange={{this.onChange}} @validationField="value" @scale={{this.scale}} />`,
      );
    }

    // currently, only euro is supported
    test('Currency should be euro by default', async function (assert) {
      await renderComponent.call(this);
      assert.dom('input').hasValue('123.56 €');
    });

    test('Input type should be text (mandatory for IMask)', async function (assert) {
      await renderComponent.call(this);
      assert.dom('input').hasAttribute('type', 'text');
    });

    test('Should set value as number', async function (assert) {
      await renderComponent.call(this);
      assert.strictEqual(this.changeset.get('value'), 123.56);
    });

    test('Should set value as number when value change', async function (assert) {
      await renderComponent.call(this);
      await fillIn('input', '123.45');
      assert.strictEqual(this.changeset.get('value'), 123.45);
    });

    test('Attributes should be passed to the input', async function (assert) {
      await renderComponent.call(this);
      assert.dom('.tpk-input').hasClass('custom-class');
    });

    test('@scale should control the decimals of the input', async function (assert) {
      await renderComponent.call(this, 3);
      assert.dom('input').hasValue('123.560 €');
    });
  },
);
