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
  'Integration | Component | Prefabs | tpk-validation-phone',
  function (hooks) {
    setupRenderingTest(hooks);

    async function renderComponent(this: TestContext) {
      const changeset = new ImmerChangeset({
        phone: '+32498542256',
      });

      this.set('changeset', changeset);

      await render(
        hbs`<Prefabs::TpkValidationPhone @changeset={{this.changeset}} @validationField="phone" />`,
      );
    }
  },
);
