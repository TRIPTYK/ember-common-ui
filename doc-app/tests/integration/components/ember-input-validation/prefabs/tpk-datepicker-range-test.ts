import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { fillIn, render, settled } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';
import { type TestContext } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import {
  setTempusDominusDate,
  openTempusDominus,
} from '@triptyk/ember-input/test-support/datepicker-helpers';

module(
  'Integration | Component | Prefabs | tpk-validation-datepicker-range',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(this: TestContext) {
      const immerChangeset = new ImmerChangeset({
        range: undefined,
      });
      this.set('changeset', immerChangeset);

      await render(
        hbs`
         <Prefabs::TpkValidationDatepickerRange
            @label="Datepicker range"
            @changeset={{this.changeset}}
            @validationField="range"
            class="tpk-input"
         />
        `,
      );
      return immerChangeset;
    }

    test('when change value in datepicker range, changeset should be update', async function (assert) {
      const date1 = new Date(2022, 10, 10);
      const date2 = new Date(2022, 10, 15);
      const changeset = await renderComponentAndReturnChangeset.call(this);
      setTempusDominusDate('.tpk-datepicker-input-input', date1, 0);
      setTempusDominusDate('.tpk-datepicker-input-input', date2, 1);
      assert.deepEqual(changeset.get('range'), [date1, date2]);
    });
  },
);
