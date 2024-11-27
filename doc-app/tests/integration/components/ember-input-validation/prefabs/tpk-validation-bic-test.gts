import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { type TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationBic from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-bic';
import { cssClassesExist } from '../generic-test-functions/css-classes-exist';
import { dataHasErrorAttribute } from '../generic-test-functions/data-has-error-attribute';

interface ThisTestContext extends TestContext {}

module(
  'Integration | Component | Prefabs | tpk-validation-bic',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(this: TestContext) {
      const immerChangeset = new ImmerChangeset({
        bic: '',
      });

      await render<ThisTestContext>(
        <template>
         <TpkValidationBic
            @label="label"
            @changeset={{immerChangeset}}
            @validationField="bic"
         />
        </template>,
      );
      return immerChangeset;
    }

    test('let only letters uppercase character go through for 8 first character', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-bic-input]', '12121212');
      assert.strictEqual(changeset.get('bic'), '');
      await fillIn('[data-test-tpk-bic-input]', 'aaaaaaaa');
      assert.strictEqual(changeset.get('bic'), '');
      await fillIn('[data-test-tpk-bic-input]', 'SEBISSEB');
      assert.strictEqual(changeset.get('bic'), 'SEBISSEB');
    });

    test('3 optional  character after first 8 accept accept uppercase letters and numbers', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-bic-input]', 'SEBISSEBA88');
      assert.strictEqual(changeset.get('bic'), 'SEBISSEBA88');
    });

    test('It changes data-has-error attribute on error', async function (this: ThisTestContext,assert) {
     const changeset = await renderComponentAndReturnChangeset.call(this);
     await dataHasErrorAttribute(assert,changeset,'bic');
    });


    test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
      await renderComponentAndReturnChangeset.call(this);
      await cssClassesExist(assert,'bic');
    });
  },
);
