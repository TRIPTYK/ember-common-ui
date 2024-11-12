import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import {
  type TestContext,
  click,
  render,
  settled,
  find,
} from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import { selectSearch } from 'ember-power-select/test-support';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
  search: (value: string) => void;
  onChange: (value: Option) => void;
  options: Option[];
}

interface Option {
  label: string;
  value: string;
  toString(): string;
}

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

    async function setChangeset(this: TestContext, fastfoodValue: string) {
      const changeset = new ImmerChangeset({ fastfood: fastfoodValue });
      this.set('changeset', changeset);
      return changeset;
    }

    async function setOptions(this: TestContext) {
      this.set('options', []);
    }

    async function setOnChangeFunction(this: ThisTestContext) {
      this.set('onChange', (value: Option) => {
        this.changeset.set('fastfood', value);
      });
    }

    async function setSearchFunction(this: TestContext, timeout: number = 0) {
      this.set('search', (value: string) => {
        if (timeout) {
          return new Promise((resolve) => {
            setTimeout(() => {
              this.set(
                'options',
                options.filter((o) => o.label.includes(value)),
              );
              resolve(void 0);
            }, timeout);
          });
        }
        this.set(
          'options',
          options.filter((o) => o.label.includes(value)),
        );
      });
    }

    async function renderComponent() {
      await render(
        hbs`<Prefabs::TpkValidationSelectSearch
          @changeset={{this.changeset}}
          @onSearch={{this.search}}
          @onChange={{this.onChange}}
          @options={{this.options}}
          @validationField="fastfood"
          @label="Select your favorite fastfood"
        />`,
      );
    }

    test('Should show default value and no options in starting', async function (this: ThisTestContext, assert) {
      await setChangeset.call(this, options[0].toString());
      await setOnChangeFunction.call(this);
      await setOptions.call(this);
      await setSearchFunction.call(this);
      await renderComponent.call(this);
      assert.strictEqual(
        find('.ember-power-select-selected-item')?.textContent?.trim(),
        'McDonald - Burger',
      );
    });

    test('Should use search select features by default', async function (this: ThisTestContext, assert) {
      await setChangeset.call(this, options[0].toString());
      await setOnChangeFunction.call(this);
      await setOptions.call(this);
      this.set('search', () => {
        assert.step('search');
      });
      await renderComponent.call(this);
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

    test('Error prefab appears if an error is added to changeset', async function (this: ThisTestContext, assert) {
      const changeset = await setChangeset.call(this, options[0].toString());
      await setOptions.call(this);
      await setOnChangeFunction.call(this);
      await setSearchFunction.call(this, 1000);
      await renderComponent.call(this);
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'fastfood',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('t:required:()');
    });
  },
);
