import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { type TestContext, render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationDatepicker from '@triptyk/ember-input-validation/components/tpk-validation-datepicker';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
  change: () => void;
}

module('Integration | Component | tpk-validation-datepicker', function (hooks) {
  setupRenderingTest(hooks);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function setupComponent(this: TestContext) {
    const date = new Date();
    const changeset = new ImmerChangeset({
      date,
    });
    this.set('changeset', changeset);
    this.set('change', () => {});

    await render<ThisTestContext>(
      <template><TpkValidationDatepicker
          @label="label"
          @changeset={{this.changeset}}
          @validationField="date"
          @onChange={{this.change}}
        as |T|>
          <T.Input />
          <T.Label />
        </TpkValidationDatepicker>
      </template>,
    );
    return changeset;
  }

  test('Dummy test', async function (assert) {
    assert.expect(0);
  });
});
