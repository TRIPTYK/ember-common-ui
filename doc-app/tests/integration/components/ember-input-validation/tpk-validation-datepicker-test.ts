import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { type TestContext, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

module('Integration | Component | tpk-validation-datepicker', function (hooks) {
  setupRenderingTest(hooks);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function setupComponent(this: TestContext) {
    const date = new Date();
    const changeset = new ImmerChangeset({
      date,
    });
    this.set('changeset', changeset);

    await render(
      hbs`<TpkValidationDatepicker @label="label" @changeset={{this.changeset}} @validationField="date" as |T|>
          <T.Input />
          <T.Label />
        </TpkValidationDatepicker>
      `,
    );
    return changeset;
  }

  test('Dummy test', async function (assert) {
    assert.expect(0);
  });
});
