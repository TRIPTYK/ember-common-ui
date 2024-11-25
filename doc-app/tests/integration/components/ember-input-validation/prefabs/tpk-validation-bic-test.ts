import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { fillIn, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { type TestContext } from '@ember/test-helpers';

module(
  'Integration | Component | Prefabs | tpk-validation-bic',
  function (hooks) {
    setupRenderingTest(hooks);

    async function renderComponentAndReturnChangeset(this: TestContext) {
      const immerChangeset = new ImmerChangeset({
        bic: '',
      });
      this.set('changeset', immerChangeset);

      await render(
        hbs`
         <Prefabs::TpkValidationBic
            @label="label"
            @changeset={{this.changeset}}
            @validationField="bic"
            class="custom-bic-class"
         />
        `,
      );
      return immerChangeset;
    }

    test('let only letters uppercase character go through for 8 first character', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', '12121212');
      assert.strictEqual(changeset.get('bic'), '');
      await fillIn('[data-test-tpk-input-input]', 'aaaaaaaa');
      assert.strictEqual(changeset.get('bic'), '');
      await fillIn('[data-test-tpk-input-input]', 'SEBISSEB');
      assert.strictEqual(changeset.get('bic'), 'SEBISSEB');
    });

    test('3 optional  character after first 8 accept accept uppercase letters and numbers', async function (assert) {
      const changeset = await renderComponentAndReturnChangeset.call(this);
      await fillIn('[data-test-tpk-input-input]', 'SEBISSEBA88');
      assert.strictEqual(changeset.get('bic'), 'SEBISSEBA88');
    });
  },
);
