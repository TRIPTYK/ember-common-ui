import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {

  click,
  render,
  settled,
  find,
} from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import { selectSearch } from 'ember-power-select/test-support';
import TpkValidationSelectSearch from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-search';



const options = [
  {
    label: 'McDonald',
    value: 'Burger',
    toString() {
      return `${this.label} - ${this.value}`;
    },
  },
  {
    label: 'Tournai Grill',
    value: 'Pitta',
    toString() {
      return `${this.label} - ${this.value}`;
    },
  },
  {
    label: 'California Dream',
    value: 'Sushi',
    toString() {
      return `${this.label} - ${this.value}`;
    },
  },
] as const;

module(
  'Integration | Component | Prefabs | tpk-validation-select-search',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponent(assert: Assert, params: {
      changeset: ImmerChangeset;
    }) {
      const onChange = (selection: unknown) => {
        params.changeset.set('fastfood', selection);
      };

      const search = () => {
        assert.step('search');
        return [] as unknown[];
      };

      const options: unknown[] = [];

      await render(
        <template>
          <TpkValidationSelectSearch
            @changeset={{params.changeset}}
            @onSearch={{search}}
            @onChange={{onChange}}
            @options={{options}}
            @validationField="fastfood"
            @label="Select your favorite fastfood"
          />
        </template>
      );
    }

    test('Should show default value and no options in starting', async function ( assert) {
     const changeset = new ImmerChangeset({ fastfood: options[0].toString() });
      await renderComponent(assert, {
        changeset
      });
      assert.strictEqual(
        find('.ember-power-select-selected-item')?.textContent?.trim(),
        'McDonald - Burger',
      );
    });

    test('Should use search select features by default', async function ( assert) {
     const changeset = new ImmerChangeset({ fastfood: options[0].toString() });
      await renderComponent(assert, {
        changeset: changeset,
      });
      await click('.ember-power-select-trigger');
      assert
        .dom('.ember-power-select-option--search-message')
        .hasText('Type to search');
      assert
        .dom('.ember-power-select-selected-item')
        .hasText('McDonald - Burger');
      await selectSearch('.tpk-select', 'new');
      assert.verifySteps(['search']);
    });

    test('Error prefab appears if an error is added to changeset', async function ( assert) {
     const changeset = new ImmerChangeset({ fastfood: options[0].toString() });
      await renderComponent(assert, {
        changeset
      });
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'fastfood',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });
  },
);
