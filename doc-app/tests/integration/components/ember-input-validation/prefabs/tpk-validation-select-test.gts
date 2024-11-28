
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {  click, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationSelect from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select';



module(
  'Integration | Component | Prefabs | tpk-validation-select',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent( options: unknown[] = []) {
      const changeset = new ImmerChangeset<
        {
          names?: string | object;
        }
      >({
        names: undefined,
      });
      const onChange = () => {};

      await render(
        <template><TpkValidationSelect
          @placeholder="Entrez un nom"
          @label="Names"
          @options={{options}}
          @changeset={{changeset}}
          @validationField="names"
          @onChange={{onChange}}
          class="custom-class"
        />
        </template>,
      );

      return changeset;
    }

    test('Applies the toString() method for displaying options', async function (assert) {
      await renderComponent( [
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
      const obj = {
        toString() {
          return 'toString() method';
        },
      };
      const changeset = await renderComponent( [obj]);
      changeset.set('names', obj);
      await settled();
      assert
        .dom('.ember-power-select-selected-item')
        .hasText('toString() method');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await renderComponent();
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'names',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });

    test('It changes data-has-error attribue on error', async function (assert) {
      const changeset = await renderComponent();
      assert
        .dom('.tpk-validation-select')
        .hasAttribute('data-has-error', 'false');

      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'names',
      });

      await settled();

      assert
        .dom('.tpk-validation-select')
        .hasAttribute('data-has-error', 'true');
    });
  },
);
