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
  'Integration | Component | Prefabs | tpk-validation-select',
  function (hooks) {
    setupRenderingTest(hooks);

    async function renderComponent(
      this: TestContext,
      options: string[] = [],
      canReset?: boolean,
    ) {
      const changeset = new ImmerChangeset({
        names: undefined,
      });

      this.set('changeset', changeset);
      this.set('options', options);
      this.set('canReset', canReset);

      await render(
        hbs`<Prefabs::TpkValidationSelect @placeholder="Entrez un nom" @label="Names" @options={{this.options}} @canReset={{this.canReset}} class="custom-class"  @changeset={{this.changeset}} @validationField="names" />`,
      );
    }

    test('Applies placeholder if nothing is selected', async function (assert) {
      await renderComponent.call(this);
      assert.dom('.tpk-select-button').hasText('Entrez un nom');
    });

    test('Applies the toString() method for displaying options', async function (assert) {
      await renderComponent.call(this, [
        {
          toString() {
            return 'toString() method';
          },
        },
      ]);

      assert.dom('.tpk-select-options-option').hasText('toString() method');
    });

    test('Applies the toString() method for displaying selected element', async function (assert) {
      let obj = {
        toString() {
          return 'toString() method';
        },
      };
      await renderComponent.call(this, [obj]);

      // eslint-disable-next-line ember/no-get
      this.get<ImmerChangeset>('changeset').set('names', obj);

      assert.dom('.tpk-select-options-option').hasText('toString() method');
    });

    test('Attributes should be passed to the input', async function (assert) {
      await renderComponent.call(this);
      assert.dom('.tpk-select').hasClass('custom-class');
    });

    test('Should not have a reset button if @canReset is false', async function (assert) {
      await renderComponent.call(this, ['a'], false);
      this.changeset.set('names', 'a');
      await settled();
      assert.dom('.tpk-select-reset-button').doesNotExist();
    });

    test('Should have a reset button if @canReset is true', async function (assert) {
      await renderComponent.call(this, ['a'], true);
      this.changeset.set('names', 'a');
      await settled();
      assert.dom('.tpk-select-reset-button').exists();
    });

    test('Should have a reset button by default', async function (assert) {
      await renderComponent.call(this, ['a'], undefined);
      this.changeset.set('names', 'a');
      await settled();
      assert.dom('.tpk-select-reset-button').exists();
    });
  },
);
