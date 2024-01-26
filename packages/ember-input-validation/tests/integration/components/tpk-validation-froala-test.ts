import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { Changeset } from 'ember-changeset';
// @ts-expect-error
import lookupValidator from 'ember-changeset-validations';
import {
  validatePresence,
  // @ts-expect-error
} from 'ember-changeset-validations/validators';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const validations = {
  message: [validatePresence(true)],
};

module(
  'Integration | Component | tpk-validation-froala-test.ts',
  function (hooks) {
    setupRenderingTest(hooks);

    test('It render the correct content', async function () {
      this.set(
        'changeset',
        Changeset(
          {
            message: '<b>a</b>',
          },
          lookupValidator(validations),
          validations
        )
      );

      await render(
        hbs`<TpkValidationFroala @label="label" @changeset={{this.changeset}} @validationField="message" />`
      );
    });
  }
);
