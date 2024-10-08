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
import { setupIntl } from 'ember-intl/test-support';

module(
  'Integration | Component | Prefabs | tpk-validation-select',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

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

      await render(
        hbs`<Prefabs::TpkValidationSelect
          @placeholder="Entrez un nom"
          @label="Names"
          @options={{this.options}}
          @changeset={{this.changeset}}
          @validationField="names"
          class="custom-class"
        />`,
      );

      return changeset;
    }

    test('Applies the toString() method for displaying options', async function (assert) {
      await renderComponent.call(this, [
        {
          toString() {
            return 'toString() method';
          },
        },
      ]);
      await click('.ember-power-select-trigger');
      assert.dom('.ember-power-select-option').hasText('toString() method');
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
      await settled();
      assert
        .dom('.ember-power-select-selected-item')
        .hasText('toString() method');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await renderComponent.call(this);
      await this.pauseTest();
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'names',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('t:required:()');
    });
  },
);