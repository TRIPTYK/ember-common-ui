import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

import { setupIntl } from 'ember-intl/test-support';
import TpkValidationNationalNumber from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-national-number';
import { a11yAudit } from 'ember-a11y-testing/test-support';


module(
  'Integration | Component | Prefabs | tpk-validation-national-number',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset({
      disabled = false,
    }: {
      disabled?: boolean;
    } = {}) {
      const immerChangeset = new ImmerChangeset({
        nationalNumber: '',
      });

      await render(
        <template>
         <TpkValidationNationalNumber
            @label="label"
            @disabled={{disabled}}
            @changeset={{immerChangeset}}
            @validationField="nationalNumber"
            class="custom-national-number-class"
         />
        </template>,
      );
      return immerChangeset;
    }

    test('let only number character go through', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset();
      await fillIn('[data-test-tpk-input-input]', 'SEBOUISNICE');
      assert.strictEqual(changeset.get('nationalNumber'), '');
    });

    test('it format nicely the national number', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset();
      await fillIn('[data-test-tpk-input-input]', '99121223453');
      assert.strictEqual(changeset.get('nationalNumber'), '99.12.12-234.53');
    });

    test('Attributes should be passed to the container', async function (assert) {
      await renderComponentAndReturnChangeset();
      assert.dom('[data-test-tpk-prefab-national-number-container]').hasClass('custom-national-number-class');
    });

    test('Error prefab appears if an error is added to changeset', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset();
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: 'a',
        key: 'nationalNumber',
      });
      assert.dom('.tpk-validation-errors').exists();
      await settled();
      assert.dom('.tpk-validation-errors span').hasText('required');
    });

    test('@disabled disables the input', async function(assert) {
      await renderComponentAndReturnChangeset({
        disabled: true
      });
      assert.dom(`[data-test-tpk-national-number-input]`).hasAttribute('disabled');
    });

    test('Accessibility', async function (assert) {
      assert.expect(0);
      await renderComponentAndReturnChangeset({
        disabled: false
      });
      await a11yAudit();
    });
  },
);
