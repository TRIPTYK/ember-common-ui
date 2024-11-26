import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { type TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { setTempusDominusDate } from '@triptyk/ember-input/test-support/datepicker-helpers';
import TpkValidationDatepickerRange from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker-range';

interface ThisTestContext extends TestContext {
  changeset: ImmerChangeset;
}

module(
  'Integration | Component | Prefabs | tpk-validation-datepicker-range',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(this: ThisTestContext) {
      const immerChangeset = new ImmerChangeset({
        range: undefined,
      });
      await render<ThisTestContext>(
        <template>
         <TpkValidationDatepickerRange
            @label="Datepicker range"
            @changeset={{immerChangeset}}
            @validationField="range"
         />
        </template>,
      );
      return immerChangeset;
    }

    test('when change value in datepicker range, changeset should be update', async function (this:ThisTestContext, assert) {
      const date1 = new Date(2022, 10, 10);
      const date2 = new Date(2022, 10, 15);
      const changeset = await renderComponentAndReturnChangeset.call(this);
      setTempusDominusDate('.tpk-datepicker-input-input', date1, 0);
      setTempusDominusDate('.tpk-datepicker-input-input', date2, 1);
      assert.deepEqual(changeset.get('range'), [date1, date2]);
    });
  },
);
