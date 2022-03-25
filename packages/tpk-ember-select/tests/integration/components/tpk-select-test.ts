import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const backendArray = ['option1', 'option2', 'option3'] as string[];

module('Integration | Component | tpk-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders default', async function (assert) {
    this.set('selected', undefined);
    this.set('options', [...backendArray]);
    this.set('selectElement', (e: string) => {
      assert.step('selected');
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
        <:option as |o|>
          {{o.option}}
        </:option>
      </TpkSelect>
    `);

    assert.verifySteps(['selected']);
  });
});
