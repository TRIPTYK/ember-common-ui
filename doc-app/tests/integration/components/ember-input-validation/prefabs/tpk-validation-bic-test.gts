import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, settled,render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { type TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationBic from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-bic';

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
      changeset.addError({
        message: 'required',
        value: '',
        originalValue: '',
        key: 'bic',
      });
      await settled();
      assert.dom('[data-test-tpk-bic-input]').hasNoText();
      assert
        .dom('[data-test-tpk-bic]')
        .hasAttribute('data-has-error', 'true');
    });


    test('CSS classes exist and have been attached to the correct element', async function (this: ThisTestContext,assert) {
      await renderComponentAndReturnChangeset.call(this);
      assert.dom('.tpk-bic-container').exists().hasAttribute('data-test-tpk-bic');
      assert.dom('.tpk-bic-container .tpk-bic-input').exists()
      assert.dom('.tpk-bic-container .tpk-validation-errors').exists()
      assert.dom('.tpk-bic-container .tpk-label').exists()
      assert.dom('label').hasClass('tpk-bic-container');
      assert.dom('input').hasClass('tpk-bic-input');
      assert.dom('label > div:first-of-type').hasClass('tpk-label', 'The first div inside label has the class tpk-label.');
      assert.dom('label > div:nth-of-type(2)').hasClass('tpk-validation-errors', 'The second div inside label has the class tpk-validation-errors.');
    });
  },
);
