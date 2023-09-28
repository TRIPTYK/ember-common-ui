/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import {
  TestContext,
  fillIn,
  findAll,
  render,
  settled,
} from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

module('Integration | Component | tpk-validation-input', function (hooks) {
  setupRenderingTest(hooks);

  async function renderComponent() {
    await render(
      hbs`<TpkValidationInput data-test-validation-input @classless={{this.classless}} @label="label" @onChange={{this.onChange}} @changeset={{this.changeset}} @validationField="name" />`,
    );
  }

  function setupChangeset(this: TestContext) {
    const changeset = new ImmerChangeset({
      name: 'a',
    });

    this.set('changeset', changeset);
    return changeset;
  }

  test('DEFAULT | it works with default syntax', async function (assert) {
    const changeset = setupChangeset.call(this);

    await renderComponent();
    assert.dom('[data-test-tpk-input]').exists();
    assert.dom('[data-test-tpk-input-label]').containsText('label');
    assert.dom('[data-test-tpk-input-input]').hasValue('a');

    await fillIn('[data-test-tpk-input-input]', '');
    assert.strictEqual(changeset.get('name'), '');

    changeset.addError({
      message: 'required',
      value: '',
      originalValue: 'a',
      key: 'name',
    });

    await settled();
    assert.dom('[data-test-tpk-input-input]').hasNoText();
    assert.dom('[data-test-tpk-input]').hasAttribute('data-has-error', 'true');
    assert.dom('.tpk-validation-input-error').exists().hasAnyText();
  });

  test('DEFAULT | override change function', async function (assert) {
    const changeset = setupChangeset.call(this);

    this.set('onChange', (value: string) => {
      assert.step('change');
      assert.strictEqual(value, 'blah');
      assert.strictEqual(
        changeset.get('name'),
        'a',
        'Value not changed in the changeset',
      );
    });

    await renderComponent();

    await fillIn('[data-test-validation-input] input', 'blah');
    assert.verifySteps(['change']);
  });

  test('DEFAULT | classless removes all the classes', async function (assert) {
    this.set('classless', false);
    setupChangeset.call(this);

    await renderComponent();

    findAll('*').forEach((e) => {
      assert.dom(e).hasClass(/tpk-.*/);
    });

    this.set('classless', true);

    findAll('*').forEach((e) => {
      assert.dom(e).hasNoClass(/tpk-.*/);
    });
  });

  test('COMPLEX | override change function', async function (assert) {
    const changeset = setupChangeset.call(this);

    this.set('onChange', (value: string) => {
      assert.step('change');
      assert.strictEqual(value, 'blah');
      assert.strictEqual(
        changeset.get('name'),
        'a',
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
      data-test-input="name" as |TI|
    >
      <TI.Label>
        Mot de passe
      </TI.Label>
      <TI.Input/>
    </TpkValidationInput>`,
    );

    await fillIn('[data-test-input="name"] input', 'blah');
    assert.verifySteps(['change']);
  });

  test('COMPLEX | changeset change when element is modified', async function (assert) {
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

    await fillIn('[data-test-input="name"] input', 'blah');
    assert.strictEqual(changeset.get('name'), 'blah');
  });
});
