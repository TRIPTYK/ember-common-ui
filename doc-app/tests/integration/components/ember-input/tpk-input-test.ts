/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import CatchState from 'dummy/tests/dummy/app/services/catch-state';

module('Integration | Component | tpk-input', function (hooks) {
  setupRenderingTest(hooks);

  test('class/less by default', async function (assert) {
    this.set('classless', false);
    await render(
      hbs`<TpkInput @classless={{this.classless}} @label="label" @value="value" />`,
    );

    assert.dom('.tpk-input-label').exists().containsText('label');
    assert.dom('.tpk-input-input').exists().hasValue('value');
    assert.dom('.tpk-input').exists();

    this.set('classless', true);

    findAll('*')
      .filter((e) => e.id !== 'modal-overlays')
      .forEach((e) => {
        assert.dom(e).hasNoClass(/tpk-.*/);
      });
  });

  test('class/has block element yield', async function (assert) {
    await render(
      hbs`<TpkInput @classless={{this.classless}} @label="label" @value="value" as |I|>
        <I.Input />
        <I.Label />
      </TpkInput>`,
    );
    assert.dom('.tpk-input-label').exists().containsText('label');
    assert.dom('.tpk-input-input').exists().hasValue('value');
    assert.dom('.tpk-input').exists();

    this.set('classless', true);

    findAll('*')
      .filter((e) => e.id !== 'modal-overlays')
      .forEach((e) => {
        assert.dom(e).hasNoClass(/tpk-.*/);
      });
  });

  test('input yield only', async function (assert) {
    await render(
      hbs`<TpkInput @type="password" @onChange={{this.change}} @label="label" @value="value" as |O|>
        {{catch-state O}}
      </TpkInput>`,
    );

    const { state }: { state: any } = (
      getOwner(this) as ApplicationInstance
    ).lookup('service:catch-state') as CatchState;

    assert.strictEqual(typeof state.Input, 'object', 'Input');
    assert.strictEqual(typeof state.onChange, 'function', 'onChange');
    assert.strictEqual(typeof state.changeEvent, 'string', 'changeEvent');
    assert.strictEqual(typeof state.Label, 'object', 'Label');
    assert.strictEqual(typeof state.guid, 'string', 'guid');
  });

  test('input with mask return masked value', async function (assert) {
    const maskPrefix = 'MLP';
    const maskContent = '0000';
    const valueToApply = '1234';

    this.set('mask', `${maskPrefix}${maskContent}`);
    this.set('change', function (e: string) {
      assert.step('step');
      assert.strictEqual(e, `${maskPrefix}${valueToApply}`);
    });
    await render(
      hbs`
      <TpkInput @type="text" @onChange={{this.change}} @label="label" @value="value" @mask={{this.mask}} as |I|>
        <I.Input />
        <I.Label />
      </TpkInput>
      `,
    );

    await fillIn('[data-test-tpk-input-input]', valueToApply);
    assert.verifySteps(['step']);
  });

  test('input with mask return unmasked value', async function (assert) {
    const maskPrefix = 'MLP';
    const maskContent = '0000';
    const valueToApply = '1234';

    this.set('mask', `${maskPrefix}${maskContent}`);
    this.set('change', function (e: string) {
      assert.step('step');
      assert.strictEqual(e, `${valueToApply}`);
    });
    await render(
      hbs`<TpkInput @type="text" @onChange={{this.change}} @label="label" @value="value" @mask={{this.mask}} @unmaskValue={{true}} as |I|>
      <I.Input></I.Input>
      <I.Label></I.Label>
</TpkInput>`,
    );

    await fillIn('[data-test-tpk-input-input]', valueToApply);
    assert.verifySteps(['step']);
  });

  test('input apply maskOptions', async function (assert) {
    const maskPrefix = 'MLP';
    const maskContent = '0000';
    this.set('maskOptions', {
      lazy: false,
      placeholderChar: '#',
    });
    this.set('mask', `${maskPrefix}${maskContent}`);
    this.set('change', () => {});
    await render(
      hbs`<TpkInput @type="text" @onChange={{this.change}} @label="label" @value="value" @mask={{this.mask}} @maskOptions={{this.maskOptions}} @unmaskValue={{true}} as |I|>
      <I.Input />
      <I.Label />
    </TpkInput>`,
    );
    assert.dom('[data-test-tpk-input-input]').hasValue(`${maskPrefix}####`);
  });

  test('Accessibility', async function (assert) {
    await render(
      hbs`<TpkInput @type="password" @onChange={{this.change}} @label="label" @value="value"/>`,
    );

    await a11yAudit();
    assert.expect(0);
  });

  test('when input type=number, onChange value should be a number', async function (assert) {
    this.set('change', function (e: number) {
      assert.step('step');
      assert.strictEqual(e, 123);
    });
    await render(
      hbs`<TpkInput @type="number" @onChange={{this.change}} @label="label" @value={{123}} as |I|>
      <I.Input></I.Input>
      <I.Label></I.Label>
</TpkInput>`,
    );

    await fillIn('[data-test-tpk-input-input]', '123');
    assert.verifySteps(['step']);
  });
});
