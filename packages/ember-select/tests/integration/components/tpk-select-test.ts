/* eslint-disable ember/no-get */
/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const backendArray = ['option1', 'option2', 'option3'] as string[];

module('Integration | Component | tpk-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it select default', async function (assert) {
    this.set('selected', undefined);
    this.set('options', [...backendArray]);
    this.set('selectElement', (e: string) => {
      assert.step('selected');
      assert.strictEqual(e, backendArray[1]);
      this.set('selected', e);
    });

    await render(hbs`
      <TpkSelect 
        @options={{this.options}} 
        @selected={{this.selected}} 
        @onChange={{this.selectElement}} 
        @defaultText="Please select something"
        @label="My select"
      >
        <:selected as |s|>
          {{s}}
        </:selected>
        <:option as |o|>
          {{o.option}}
        </:option>
      </TpkSelect>
    `);

    assert.dom('.tpk-select button').containsText('Please select something');
    assert
      .dom('.tpk-select .tpk-select-label')
      .exists()
      .containsText('My select');

    await click('.tpk-select button');
    await click("[data-test-option='1']");

    assert.dom('.tpk-select button').containsText('option2');

    assert.verifySteps(['selected']);
  });

  test('it select multiple', async function (assert) {
    this.set('selected', []);
    this.set('options', [...backendArray]);
    this.set('selectElement', (e: string) => {
      const s = this.get('selected') as string[];
      s.push(e);
      this.set('selected', [...s]);
      assert.step('selected');
    });

    await render(hbs`
      <TpkSelect 
        @options={{this.options}} 
        @selected={{this.selected}} 
        @onChange={{this.selectElement}}
        @multiple={{true}} 
        @defaultText="Please select something"
        @label="My select"
      >
        <:selected as |s|>
          {{s}}
        </:selected>
        <:option as |o|>
          {{o.option}}
        </:option>
      </TpkSelect>
    `);

    assert.dom('.tpk-select button').containsText('Please select something');

    await click('.tpk-select button');
    await click("[data-test-option='1']");
    assert.dom('.tpk-select button').containsText('option2');

    await click('.tpk-select button');
    assert.dom('.tpk-select[data-is-open="true"]').exists();
    await click("[data-test-option='2']");
    assert.dom('.tpk-select[data-is-open="false"]').exists();
    assert.dom('.tpk-select button').containsText('option2');
    assert.dom('.tpk-select button').containsText('option3');

    assert.verifySteps(['selected', 'selected']);
  });
});
