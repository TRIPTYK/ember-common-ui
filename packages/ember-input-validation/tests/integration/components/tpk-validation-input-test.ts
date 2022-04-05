/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { fillIn, findAll, render } from '@ember/test-helpers';
import { Changeset } from 'ember-changeset';
// @ts-expect-error
import lookupValidator from 'ember-changeset-validations';
import {
  validatePresence,
  // @ts-expect-error
} from 'ember-changeset-validations/validators';

const validations = {
  name: [validatePresence(true)],
};

module('Integration | Component | tpk-validation-input', function (hooks) {
  setupRenderingTest(hooks);

  test('DEFAULT | it works with default syntax', async function (assert) {
    this.set(
      'changeset',
      Changeset(
        {
          name: 'a',
        },
        lookupValidator(validations),
        validations
      )
    );

    await render(
      hbs`<TpkValidationInput @label="label" @changeset={{this.changeset}} @validationField="name" />`
    );
    assert.dom('[data-test-tpk-input]').exists();
    assert.dom('[data-test-tpk-input-label]').containsText('label');
    assert.dom('[data-test-tpk-input-input]').hasValue('a');

    await fillIn('[data-test-tpk-input-input]', '');
    assert.dom('[data-test-tpk-input-input]').hasNoText();
    assert.dom('[data-test-tpk-input]').hasAttribute('data-has-error', 'true');
    assert.dom('.tpk-validation-input-error').exists().hasAnyText();
  });

  test('DEFAULT | override change function', async function (assert) {
    const changeset = Changeset(
      {
        name: 'a',
      },
      lookupValidator(validations),
      validations
    );

    this.set('changeset', changeset);

    this.set('onChange', (value: string) => {
      assert.step('change');
      assert.strictEqual(value, 'blah');
      assert.strictEqual(
        changeset.get('name'),
        'a',
        'Value not changed in the changeset'
      );
    });

    await render(
      hbs`<TpkValidationInput data-test-validation-input @label="label" @onChange={{this.onChange}} @changeset={{this.changeset}} @validationField="name" />`
    );

    await fillIn('[data-test-validation-input] input', 'blah');
    assert.verifySteps(['change']);
  });

  test('DEFAULT | classless removes all the classes', async function (assert) {
    this.set(
      'changeset',
      Changeset(
        {
          name: 'a',
        },
        lookupValidator(validations),
        validations
      )
    );

    await render(
      hbs`<TpkValidationInput @label="label" @changeset={{this.changeset}} @classless={{this.classless}} @validationField="name" />`
    );

    findAll('*').forEach((e) => {
      assert.dom(e).hasClass(/tpk-.*/);
    });

    this.set('classless', true);

    findAll('*').forEach((e) => {
      assert.dom(e).hasNoClass(/tpk-.*/);
    });
  });

  test('COMPLEX | classless removes all the classes', async function (assert) {
    this.set(
      'changeset',
      Changeset(
        {
          name: 'a',
        },
        lookupValidator(validations),
        validations
      )
    );

    await render(
      hbs`<TpkValidationInput
      @label="Mot de passe"
      @placeholder="mot de passe"
      @onChange={{this.onChange}}
      @changeset={{this.changeset}}
      @classless={{this.classless}}
      @validationField="name"
      data-test-input="name" as |TI|
    >
      <TI.Label>
        Mot de passe
      </TI.Label>
      <TI.Input/>
    </TpkValidationInput>`
    );

    findAll('*').forEach((e) => {
      assert.dom(e).hasClass(/tpk-.*/);
    });

    this.set('classless', true);

    findAll('*').forEach((e) => {
      assert.dom(e).hasNoClass(/tpk-.*/);
    });
  });

  test('COMPLEX | override change function', async function (assert) {
    const changeset = Changeset(
      {
        name: 'a',
      },
      lookupValidator(validations),
      validations
    );

    this.set('changeset', changeset);

    this.set('onChange', (value: string) => {
      assert.step('change');
      assert.strictEqual(value, 'blah');
      assert.strictEqual(
        changeset.get('name'),
        'a',
        'Value not changed in the changeset'
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
    </TpkValidationInput>`
    );

    await fillIn('[data-test-input="name"] input', 'blah');
    assert.verifySteps(['change']);
  });

  test('COMPLEX | changeset change when element is modified', async function (assert) {
    const changeset = Changeset(
      {
        name: 'a',
      },
      lookupValidator(validations),
      validations
    );

    this.set('changeset', changeset);

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
    </TpkValidationInput>`
    );

    await fillIn('[data-test-input="name"] input', 'blah');
    assert.strictEqual(changeset.get('name'), 'blah');
  });
});
