import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, fillIn, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';
import TpkValidationInput from '@triptyk/ember-input-validation/components/tpk-validation-input';

interface ThisTestContext extends TestContext {
}

module('Integration | Component | tpk-validation-input', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');

  async function renderComponent(
    type: string,
    onChange: (value: unknown) => void,
    changeset: ImmerChangeset,
  ) {
    await render<ThisTestContext>(
      <template><TpkValidationInput @type={{type}}  @label="label" @onChange={{onChange}} @changeset={{changeset}} @validationField="name" as |I|>
      <I.Label /><I.Input/></TpkValidationInput>
      </template>
    );
  }

  function setupChangeset(this: TestContext) {
    return new ImmerChangeset({
      name: 'value',
    });
  }

  test('It overrides change function', async function (assert) {
    const changeset = setupChangeset.call(this);

    const onChange = (value: unknown) => {
      assert.step('change');
      assert.strictEqual(value, 'blah');
      assert.strictEqual(
        changeset.get('name'),
        'value',
        'Value not changed in the changeset',
      );
    };

    await renderComponent(
      'text',
      onChange,
      changeset,
    );
    await fillIn('input', 'blah');
    assert.verifySteps(['change']);
  });

  test('override change function', async function (assert) {
    const changeset = setupChangeset.call(this);

    const onChange = (value: unknown) => {
      assert.step('change');
      assert.strictEqual(value, 'valueChanged');
      assert.strictEqual(
        changeset.get('name'),
        'value',
        'Value not changed in the changeset',
      );
    };

    await render<ThisTestContext>(
      <template><TpkValidationInput
      @label="Mot de passe"
      @placeholder="mot de passe"
      @onChange={{onChange}}
      @changeset={{changeset}}
      @validationField="name"
    as |I|><I.Label /><I.Input/></TpkValidationInput>
    </template>
    );

    await fillIn('input', 'valueChanged');
    assert.verifySteps(['change']);
  });

  test('changeset change when element is modified', async function (assert) {
    const changeset = setupChangeset.call(this);

    await render<ThisTestContext>(
      <template><TpkValidationInput
      @label="Mot de passe"
      @placeholder="mot de passe"
      @changeset={{changeset}}
      @validationField="name"
      as |TI|
    >
      <TI.Label>
        Mot de passe
      </TI.Label>
      <TI.Input/>
    </TpkValidationInput>
    </template>
    );

    await fillIn('input', 'valueChanged');
    assert.strictEqual(changeset.get('name'), 'valueChanged');
  });
});
