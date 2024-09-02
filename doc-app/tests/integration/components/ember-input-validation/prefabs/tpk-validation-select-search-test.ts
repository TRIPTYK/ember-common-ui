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
import { waitFor } from '@ember/test-helpers';
import tpkSelectSearch from 'dummy/tests/pages/tpk-select-search';

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
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
];

module(
  'Integration | Component | Prefabs | tpk-validation-select-search',
  function (hooks) {
    setupRenderingTest(hooks);

    async function setChangeset(
      this: TestContext,
      fastfoodValue: string = 'McDonald',
    ) {
      this.set('changeset', new ImmerChangeset({ fastfood: fastfoodValue }));
    }

    async function setOptions(this: TestContext) {
      this.set('options', []);
    }

    async function setOnChangeFunction(this: TestContext) {
      this.set('onChange', (value: Option) => {
        this.changeset.set('fastfood', value.label);
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
              resolve();
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

    test('Should show default value and no options in starting', async function (assert) {
      await setChangeset.call(this);
      await setOptions.call(this);
      await setSearchFunction.call(this);
      await renderComponent.call(this);
      assert.strictEqual(tpkSelectSearch.input.value, 'McDonald');
      assert.strictEqual(tpkSelectSearch.listbox.options.length, 0);
    });
    test('Should loading spinner when searching', async function (assert) {
      await setChangeset.call(this);
      await setOptions.call(this);
      await setSearchFunction.call(this, 1000);
      await renderComponent.call(this);
      tpkSelectSearch.input.fillIn('Tournai');
      await waitFor('.loader');
      assert.dom('.loader').exists();
    });
  },
);
