import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, fillIn, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { setupIntl } from 'ember-intl/test-support';

module('Integration | Component | tpk-validation-input', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'fr-fr');

  async function renderComponent() {
    await render(
      hbs`<TpkValidationInput @showTogglePasswordButton={{this.showTogglePasswordButton}} @type={{this.type}} data-test-validation-input @label="label" @onChange={{this.onChange}} @changeset={{this.changeset}} @validationField="name" as |I|>
      <I.Label /><I.Input/></TpkValidationInput>`,
    );
  }

  function setupChangeset(this: TestContext) {
    const changeset = new ImmerChangeset({
      name: 'value',
    });

    this.set('changeset', changeset);
    return changeset;
  }

  test('It overrides change function', async function (assert) {
    const changeset = setupChangeset.call(this);

    this.set('onChange', (value: string) => {
      assert.step('change');
      assert.strictEqual(value, 'blah');
      assert.strictEqual(
        changeset.get('name'),
        'value',
        'Value not changed in the changeset',
      );
    });

    await renderComponent();
    await fillIn('input', 'blah');
    assert.verifySteps(['change']);
  });

  test('override change function', async function (assert) {
    const changeset = setupChangeset.call(this);

    this.set('onChange', (value: string) => {
      assert.step('change');
      assert.strictEqual(value, 'valueChanged');
      assert.strictEqual(
        changeset.get('name'),
        'value',
        'Value not changed in the changeset',
      );
    });

    await render(
      hbs`<TpkValidationInput
      @label="Mot de passe"
      @placeholder="mot de passe"
      @onChange={{this.onChange}}
      @changeset={{this.changeset}}
      @validationField="name"
    as |I|><I.Label /><I.Input/></TpkValidationInput>`,
    );

    await fillIn('input', 'valueChanged');
    assert.verifySteps(['change']);
  });

  test('changeset change when element is modified', async function (assert) {
    const changeset = setupChangeset.call(this);

    await render(
      hbs`<TpkValidationInput
      @label="Mot de passe"
      @placeholder="mot de passe"
      @changeset={{this.changeset}}
      @validationField="name"
      data-test-input="name" as |TI|
    >
      <TI.Label>
        Mot de passe
      </TI.Label>
      <TI.Input/>
    </TpkValidationInput>`,
    );

    await fillIn('input', 'valueChanged');
    assert.strictEqual(changeset.get('name'), 'valueChanged');
  });
});
