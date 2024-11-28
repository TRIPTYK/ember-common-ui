import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { ImmerChangeset } from 'ember-immer-changeset';

import { setupIntl } from 'ember-intl/test-support';
import { setTempusDominusDate } from '@triptyk/ember-input/test-support/datepicker-helpers';
import TpkValidationDatepickerRange from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker-range';
import { assertTpkCssClassesExist } from '../generic-test-functions/assert-tpk-css-classes-exist';
import { assertDataHasErrorAttribute } from '../generic-test-functions/assert-data-has-error-attribute';


module(
  'Integration | Component | Prefabs | tpk-validation-datepicker-range',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'fr-fr');

    async function renderComponentAndReturnChangeset(params?: {
      disabled?: boolean;
    }) {
      const immerChangeset = new ImmerChangeset({
        'datepicker-range': undefined,
      });
      await render(
        <template>
         <TpkValidationDatepickerRange
            @label="Datepicker range"
            @disabled={{params.disabled}}
            @changeset={{immerChangeset}}
            @validationField="datepicker-range"
         />
        </template>,
      );
      return immerChangeset;
    }

    test('when change value in datepicker range, changeset should be update', async function (assert) {
      const date1 = new Date(2022, 10, 10);
      const date2 = new Date(2022, 10, 15);
      const changeset = await renderComponentAndReturnChangeset();
      setTempusDominusDate('.tpk-datepicker-range-input', date1, 0);
      setTempusDominusDate('.tpk-datepicker-range-input', date2, 1);
      assert.deepEqual(changeset.get('datepicker-range'), [date1, date2]);
    });

    test('It changes data-has-error attribute on error', async function (assert) {
     const changeset = await renderComponentAndReturnChangeset();
      await assertDataHasErrorAttribute(assert,changeset,'datepicker-range');
    });

    test('CSS classes exist and have been attached to the correct element', async function (assert) {
      await renderComponentAndReturnChangeset();
      await assertTpkCssClassesExist(assert,'datepicker-range');
    });

    test('@disabled disables the input', async function(assert) {
      await renderComponentAndReturnChangeset({
        disabled: true,
      });
      assert.dom(`[data-test-tpk-datepicker-range-input]`).hasAttribute('disabled');
    });
  },
);
