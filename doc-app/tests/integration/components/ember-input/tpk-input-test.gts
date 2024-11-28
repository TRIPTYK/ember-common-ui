
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';
import CatchState from 'doc-app/services/catch-state';

import catchState from 'doc-app/helpers/catch-state';
import TpkInput from '@triptyk/ember-input/components/tpk-input';



module('Integration | Component | tpk-input', function (hooks) {
  setupRenderingTest(hooks);

  test('input yield only', async function (assert) {
    await render(
      <template><TpkInput @type="password" @label="label" @value="value" as |O|>
        {{catchState O}}
      </TpkInput>
      </template>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { state }: { state: any } = (
      getOwner(this) as ApplicationInstance
    ).lookup('service:catch-state') as CatchState;

    assert.strictEqual(typeof state.Input, 'object', 'Input');
    assert.strictEqual(typeof state.changeEvent, 'string', 'changeEvent');
    assert.strictEqual(typeof state.Label, 'object', 'Label');
    assert.strictEqual(typeof state.guid, 'string', 'guid');
  });

  test('input with mask return masked value', async function (assert) {
    const maskPrefix = 'MLP';
    const maskContent = '0000';
    const valueToApply = '1234';

    const mask = `${maskPrefix}${maskContent}`;
    const change = function (e: unknown) {
      assert.step('step');
      assert.strictEqual(e, `${maskPrefix}${valueToApply}`);
    };
    await render(
      <template>
      <TpkInput @type="text" @onChange={{change}} @label="label" @value="value" @mask={{mask}} as |I|>
        <I.Input />
        <I.Label />
      </TpkInput>

      </template>
    );

    await fillIn('[data-test-tpk-input-input]', valueToApply);
    assert.verifySteps(['step']);
  });

  test('input with mask return unmasked value', async function (assert) {
    const maskPrefix = 'MLP';
    const maskContent = '0000';
    const valueToApply = '1234';

    const mask = `${maskPrefix}${maskContent}`;
    const change = function (e: unknown) {
      assert.step('step');
      assert.strictEqual(e, `${valueToApply}`);
    };
    await render(
      <template><TpkInput @type="text" @onChange={{change}} @label="label" @value="value" @mask={{mask}} @unmaskValue={{true}} as |I|>
      <I.Input></I.Input>
      <I.Label></I.Label>
</TpkInput> </template>
    );

    await fillIn('[data-test-tpk-input-input]', valueToApply);
    assert.verifySteps(['step']);
  });

  test('input apply maskOptions', async function (assert) {
    const maskPrefix = 'MLP';
    const maskContent = '0000';
    const maskOptions = {
      lazy: false,
      placeholderChar: '#',
    };
    const mask = `${maskPrefix}${maskContent}`;
    const change = () => {};
    await render(
      <template><TpkInput @type="text" @onChange={{change}} @label="label" @value="value" @mask={{mask}} @maskOptions={{maskOptions}} @unmaskValue={{true}} as |I|>
      <I.Input />
      <I.Label />
    </TpkInput>
      </template>
    );
    assert.dom('[data-test-tpk-input-input]').hasValue(`${maskPrefix}####`);
  });

  test('when input type=number, onChange value should be a number', async function (assert) {
    const change = function (e: unknown) {
      assert.step('step');
      assert.strictEqual(e, 123);
    };
    await render(
      <template><TpkInput @type="number" @onChange={{change}} @label="label" @value={{123}} as |I|>
      <I.Input></I.Input>
      <I.Label></I.Label>
</TpkInput> </template>
    );

    await fillIn('[data-test-tpk-input-input]', '123');
    assert.verifySteps(['step']);
  });
});
