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

module('Integration | Component | tpk-validation-input', function (hooks) {
  setupRenderingTest(hooks);

  async function renderComponent() {
    await render(
      hbs`<TpkValidationInput @showTogglePasswordButton={{this.showTogglePasswordButton}} @type={{this.type}} data-test-validation-input @classless={{this.classless}} @label="label" @onChange={{this.onChange}} @changeset={{this.changeset}} @validationField="name" />`,
    );
  }

  async function renderYieldedComponent() {
    await render(
      hbs`<TpkValidationInput @showTogglePasswordButton={{this.showTogglePasswordButton}} @type={{this.type}} data-test-validation-input @classless={{this.classless}} @label="yieldedLabel" @onChange={{this.onChange}} @changeset={{this.changeset}} @validationField="name" as |I| >
      <I.Label/>
      <I.Input/>
      </TpkValidationInput>
      `,
    );
  }

  function setupChangeset(this: TestContext) {
    const changeset = new ImmerChangeset({
      name: 'value',
    });

    this.set('changeset', changeset);
    return changeset;
  }

  function setType(this: TestContext, type: string) {
    this.set('type', type);
  }

  test('It changes data-has-error attribue on error', async function (assert) {
    const changeset = setupChangeset.call(this);

    await renderComponent();
    assert.dom('[data-test-tpk-input]').exists();
    assert.dom('[data-test-tpk-input-label]').containsText('label');
    assert.dom('[data-test-tpk-input-input]').hasValue('value');

    await fillIn('[data-test-tpk-input-input]', '');
    assert.strictEqual(changeset.get('name'), '');

    changeset.addError({
      message: 'required',
      value: '',
      originalValue: 'value',
      key: 'name',
    });

    await settled();
    assert.dom('[data-test-tpk-input-input]').hasNoText();
    assert.dom('[data-test-tpk-input]').hasAttribute('data-has-error', 'true');
  });

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
    await fillIn('[data-test-validation-input] input', 'blah');
    assert.verifySteps(['change']);
  });

  test('renders generic input validation', async function (assert) {
    const changeset = setupChangeset.call(this);

    await renderComponent();
    assert.dom('[data-test-input-not-yielded]').exists();
    assert.dom('[data-test-label-not-yielded]').exists();
    assert.dom('[data-test-label-not-yielded]').containsText('label');
    assert.dom('[data-test-input-not-yielded]').hasValue('value');

    assert.strictEqual(changeset.get('name'), 'value');
  });

  test('it overrides generic input by yielded one', async function (assert) {
    const changeset = setupChangeset.call(this);

    await renderYieldedComponent();
    assert.dom('[data-test-input-not-yielded]').doesNotExist();
    assert.dom('[data-test-label-not-yielded]').doesNotExist();
    assert.dom('[data-test-tpk-input]').exists();
    assert.dom('[data-test-tpk-input-label]').containsText('yieldedLabel');
    await fillIn('[data-test-tpk-input-input]', 'yieldedValue');
    assert.dom('[data-test-tpk-input-input]').hasValue('yieldedValue');
  });

  test('Classless removes all the classes', async function (assert) {
    this.set('classless', false);
    this.set('showTogglePasswordButton', true);
    setupChangeset.call(this);
    await renderComponent();

    findAll('*')
      .filter((e) => e.id !== 'modal-overlays')
      .forEach((e) => {
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
      data-test-input="name"
    />`,
    );

    await fillIn('[data-test-input="name"] input', 'valueChanged');
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

    await fillIn('[data-test-input="name"] input', 'valueChanged');
    assert.strictEqual(changeset.get('name'), 'valueChanged');
  });
});
